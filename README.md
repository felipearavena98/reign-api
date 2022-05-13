# Reign - API

El siguiente documento tiene el propósito de explicar el funcionamiento del backend.
## Autor

- [@felipearavena98](https://github.com/felipearavena98)

## Estructura
El backend fue desarrollado en nodejs.
![App Screenshot](https://github.com/felipearavena98/imagenes/blob/main/img-proyecto-bsale/parte1BACK.png?raw=true)
- db: En esta carpeta se encuentra la función que realiza la conexión a la base de datos.
- routes: En esta carpeta se encuentra la configuración de las rutas y los respectivos filtros para la base de datos que levantan la api.
- index: contiene las configuraciones principales para levantar el backend.

### Instalaciones Necesarias
- [axios](https://www.npmjs.com/package/axios)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [node-cron](https://www.npmjs.com/package/node-cron)
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

## Configuraciones
Esta es la función que representa a la conexión de la base de datos, la cual nos permite acceder a los productos y categorías, los que posteriormente servirán para desarrollar las consultas y armar la API.

### Configuracion del servidor
```javascript
const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            buscar: '/api/buscar',
            noticia: '/api/news',
        }
        this.swaggerSpec = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "News API",
                    version: "1.0.0"
                },
                servers: [
                    {
                        url: 'http://localhost:8080',
                    },
                ]
            },
            apis: [
                `${path.join(__dirname, '../routes/*.js')}`,
                `${path.join(__dirname, '../models/news.js')}`
            ]
        }
        this.cnnDB();
        this.middlewares();
        this.routes();
    }
    async cnnDB() {
        await dbConnection();
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }
    routes() {
        // news api
        this.app.use(this.paths.noticia, require('../routes/news'))
        // Search api
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        // Documentation Api
        this.app.use('/api/swagger-doc', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(this.swaggerSpec)))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor Corriendo en puerto', this.port)
        })
    }
}
module.exports = Server;
```

### Conexion a base de datos

```javascript
const mongoose = require('mongoose')

const dbConnection = async () => {

    try {
        mongoose.connect(process.env.MONGODB_CNN)
        console.log('Database is Online')
    } catch (error) {
        throw new Error('Connection Refused, database is not Found')
    }

}

module.exports = {
    dbConnection
}
```

## Controladores 

### Importaciones de EndPoint Noticias

```javascript
const { default: axios } = require('axios');
const { response, request } = require('express');
const Noticia = require('../models/news')
const cron = require('node-cron')
```
### Funcion para obtener Noticias - EndPoint

```javascript
const newsGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, noticias] = await Promise.all([
        Noticia.countDocuments(query),
        Noticia.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        noticias,
        msg: 'get API - controlador'
    })
}

```
### Funcion para obtener Noticias por id - EndPoint
```javascript
const OnenewsGet = async (req, res = response, next) => {
    const { id } = req.params;
    const noticia = await Noticia.findById(id)

    if (!noticia) {
        res.json({ msg: 'No se puede realizar la búsqueda' })
        next()
    }

    res.json(noticia)
}
```

### Funcion para obtener noticias de la api y guardarlas en la base de datos - EndPoint
```javascript
cron.schedule('*/59 * * * *', async () => {

    const instance = await axios('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
    const datos = instance.data.hits
    await Noticia.insertMany(datos)

    res.json({
        msg: 'post API - controlador',
        datos
    })

})

```
### Funcion para eliminar noticias - EndPoint

```javascript
const newsDelete = async (req, res = response) => {

    const { id } = req.params;
    const noticia = await Noticia.findByIdAndUpdate(id, { estado: false });

    res.json(noticia);
}
```

### Controlador de Busqueda

```javascript
const { response } = require("express")
const { isValidObjectId } = require("mongoose")
const Noticia = require('../models/news')
```

```javascript
const coleccionesPermitidas = [
    'noticias'
]
```

```javascript
const buscarNoticias = async (termino = '', res = response) => {

    const esMongoID = isValidObjectId(termino); // TRUE

    if (esMongoID) {
        const noticia = await Noticia.findById(termino)
        return res.json({
            results: (noticia) ? [noticia] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const noticias = await Noticia.find({
        $or: [{ title: regex }, { author: regex }, { _tags: regex }, { story_title: regex }],
        $and: [{ estado: true }]
    })

    res.json({
        results: noticias
    })

}
```

```javascript
const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `La unica colección permitida es: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'noticias':
            buscarNoticias(termino, res)
            break;

        default:
            res.status(500).json({
                msg: 'Acción no implementada para estos casos.'
            })
    }

}
```
## Rutas

### Ruta para busqueda de notcias buscar.js

```javascript
const { Router } = require("express")
const { buscar } = require('../controllers/buscar')

const router = Router()

router.get('/:coleccion/:termino', buscar)

module.exports = router;
```
### Ruta para busqueda de notcias news.js

```javascript
const { Router } = require('express');
const { newsGet,
    newsDelete,
    OnenewsGet } = require('../controllers/news');

const router = Router();

router.get('/', newsGet)

router.get('/:id', OnenewsGet)

router.delete('/:id', newsDelete)

module.exports = router;
```
