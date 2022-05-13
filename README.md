# Reign - API

El siguiente documento tiene el propósito de explicar el funcionamiento del backend.
## Autor

- [@felipearavena98](https://github.com/felipearavena98)

## Estructura

El backend fue desarrollado en nodejs.

![App Screenshot](https://github.com/felipearavena98/imagenes/blob/main/img-proyecto-bsale/parte1BACK.png?raw=true)

- controllers: El contenido que se encuentra aquí, contiene las funciones de nuestra api.
- database: La carpeta de database contiene la configuración de conexión a la Base de datos.
- models: Contiene el modelo de la base de datos y la configuración del servidor.
- routes: En esta carpeta se encuentra la configuración de las rutas de la api.
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

## Configuraciones y Instrucciones
- Los unicos archivos que se deben configurar son el .env y server.js.
- Las siguientes instrucciones son para hacer funcionar la api, solo de manera local.




## Referencia API

#### Endpoint para obtener todos las noticias
Al obtener los datos de la api, se pasan de manera inmediata a la base de datos, este endpoint funciona para realizar la consulta a la base de datos y traer todos los datos que se encuentran en ella.

```http
  GET /api/news/
```

| Type     | Description  (Example)                       |
| :------- | :--------------------------------------------|
| `string` | http://localhost:8080/api/news/              |

```json
"total": 39,
    "noticias": [
        {
            "_id": "627eaee9667b9d8fdc4002b9",
            "created_at": "2022-05-13T07:57:57.000Z",
            "title": null,
            "url": null,
            "author": "Joel_Mckay",
            "points": null,
            "story_text": null,
            "comment_text": "I think the main reason is that untrained EEs end up doing their best to ship product. Since the rise of outsourcing hardware manufacturing, it is simply that domestic demand is now low. Also, most PHBs have zero understanding of low-level systems, and visible areas are easier to quantify value.\nBasically, the kids with 37000 dependencies in their nodejs steaming pile of awesome… are more impressive than some graybeard’s 4 C library solution that needs updated once every 5 years.",
            "num_comments": null,
            "story_id": 31363738,
            "story_title": "A guide to getting started with embedded systems",
            "story_url": "https://yinka.dev/blog/a-guide-to-getting-started-with-embedded-systems/",
            "parent_id": 31364360,
            "created_at_i": 1652428677,
            "_tags": [
                "comment",
                "author_Joel_Mckay",
                "story_31363738"
            ],
            "objectID": "31364615",
            "_highlightResult": {
                "author": {
                    "value": "Joel_Mckay",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "comment_text": {
                    "value": "I think the main reason is that untrained EEs end up doing their best to ship product. Since the rise of outsourcing hardware manufacturing, it is simply that domestic demand is now low. Also, most PHBs have zero understanding of low-level systems, and visible areas are easier to quantify value.\nBasically, the kids with 37000 dependencies in their <em>nodejs</em> steaming pile of awesome… are more impressive than some graybeard’s 4 C library solution that needs updated once every 5 years.",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "nodejs"
                    ]
                },
                "story_title": {
                    "value": "A guide to getting started with embedded systems",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "story_url": {
                    "value": "https://yinka.dev/blog/a-guide-to-getting-started-with-embedded-systems/",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            },
            "estado": true,
            "__v": 0
        },
```
#### Endpoint para obtener solo 1 noticia filtrada por id
Si queremos solo un elemento de la base de datos, podremos realizar una consulta mas personalizada, insertando solo el id de la noticia que queremos.

```http
  GET /api/news/idReference
```

| Type     | Description  (Example)                                 |
| :------- | :------------------------------------------------------|
| `string` | http://localhost:8080/api/news/627eaee9667b9d8fdc4002b8|

```json
{
    "_id": "627eaee9667b9d8fdc4002b8",
    "created_at": "2022-05-13T16:38:22.000Z",
    "title": "Ask HN: TypeScript config confusion",
    "url": null,
    "author": "w3456yhbvr5yh",
    "points": "2",
    "story_text": "I&#x27;ve been using typescript (ts) for various projects for two years. I&#x27;ve been pleased with the type safety and various other features of ts and I think it represents a better way to use node&#x2F;js.<p>That being said, I&#x27;ve read the microsoft [documentation for the tsconfig](https:&#x2F;&#x2F;www.typescriptlang.org&#x2F;tsconfig) more times than I can count. In that time I have read through dozens (hundreds???) of blog posts, stack threads, github issues and the like for knowledge or hints about how to properly understand and use the `tsconfig.json` options to no avail.<p>Issues in the github repo for microsoft&#x2F;typescript are a great entrypoint for those seeking some background:\n- https:&#x2F;&#x2F;github.com&#x2F;microsoft&#x2F;TypeScript&#x2F;issues&#x2F;39965\n- https:&#x2F;&#x2F;github.com&#x2F;microsoft&#x2F;TypeScript&#x2F;issues&#x2F;27481\n- https:&#x2F;&#x2F;github.com&#x2F;microsoft&#x2F;TypeScript&#x2F;issues&#x2F;38546<p>Every thread like these is the same: years of people showing up to the same forums and repeating the same questions. How can `require` vs `import` still be consuming man-millenia of time and frustration? How is `async` still bringing career and psyche to ruin?<p>In-the-know folks will point out, that the _real_ issue is no longer `require` vs `import` but<p>```\nimport * as bs from &#x27;bs&#x27;\n&#x2F;&#x2F; VS\nimport bs from &#x27;bs&#x27;\n```<p>But there are actually 2 or 3 other mutually exclusive ways of importing packages, depending on which incantations of &quot;module&quot;, &quot;target&quot;, and &quot;compilerOptions&quot; you cobble together.<p>typescript provides no overview for installation and setup process and provides no guidance on how to migrate from any particular syntax to any other. I understand the matrix of overlapping inputs and possible outputs makes tsc&#x27;s job difficult but this is an absurd amount of confusion given that every single person in these threads is just trying to import a package and can&#x27;t seem to figure out anywhere how to do that.<p>Suggestions welcome.",
    "comment_text": null,
    "num_comments": "0",
    "story_id": null,
    "story_title": null,
    "story_url": null,
    "parent_id": null,
    "created_at_i": 1652459902,
    "_tags": [
        "story",
        "author_w3456yhbvr5yh",
        "story_31369751",
        "ask_hn"
    ],
    "objectID": "31369751",
    "_highlightResult": {
        "title": {
            "value": "Ask HN: TypeScript config confusion",
            "matchLevel": "none",
            "matchedWords": []
        },
        "author": {
            "value": "w3456yhbvr5yh",
            "matchLevel": "none",
            "matchedWords": []
        },
        "story_text": {
            "value": "I've been using typescript (ts) for various projects for two years. I've been pleased with the type safety and various other features of ts and I think it represents a better way to use <em>node/js</em>.<p>That being said, I've read the microsoft [documentation for the tsconfig](https://www.typescriptlang.org/tsconfig) more times than I can count. In that time I have read through dozens (hundreds???) of blog posts, stack threads, github issues and the like for knowledge or hints about how to properly understand and use the `tsconfig.json` options to no avail.<p>Issues in the github repo for microsoft/typescript are a great entrypoint for those seeking some background:\n- https://github.com/microsoft/TypeScript/issues/39965\n- https://github.com/microsoft/TypeScript/issues/27481\n- https://github.com/microsoft/TypeScript/issues/38546<p>Every thread like these is the same: years of people showing up to the same forums and repeating the same questions. How can `require` vs `import` still be consuming man-millenia of time and frustration? How is `async` still bringing career and psyche to ruin?<p>In-the-know folks will point out, that the _real_ issue is no longer `require` vs `import` but<p>```\nimport * as bs from 'bs'\n// VS\nimport bs from 'bs'\n```<p>But there are actually 2 or 3 other mutually exclusive ways of importing packages, depending on which incantations of &quot;module&quot;, &quot;target&quot;, and &quot;compilerOptions&quot; you cobble together.<p>typescript provides no overview for installation and setup process and provides no guidance on how to migrate from any particular syntax to any other. I understand the matrix of overlapping inputs and possible outputs makes tsc's job difficult but this is an absurd amount of confusion given that every single person in these threads is just trying to import a package and can't seem to figure out anywhere how to do that.<p>Suggestions welcome.",
            "matchLevel": "full",
            "fullyHighlighted": false,
            "matchedWords": [
                "nodejs"
            ]
        }
    },
    "estado": true,
    "__v": 0
}
```

#### Endpoint para eliminar noticia
Para eliminar un elemento de la base de datos, podemos ejecutar esta acción, lo que hace esta funcion es establecer un estado, el cual cambia al ser ejecutado y excluye este elemento de las futuras consultas. El motivo de esta funcionalidad al ser manejada con un estado, nos permite mantener un registro de un elemento que anteriormente estuvo disponible.
```http
  DELETE /api/news/idReference
```
| Type     | Description  (Example)                                 |
| :------- | :------------------------------------------------------|
| `string` | http://localhost:8080/api/news/627eaee9667b9d8fdc4002b8|

#### Endpoint para buscar noticia con filtros
En este filtro de búsqueda podemos filtrar por title, _tags, author. Cualquiera de estos elementos de busqueda nos encontrara algun resultado, en caso de no encontrar nada nos enviara un arreglo vacio.
```http
  GET api/buscar/noticias/title
  GET api/buscar/noticias/_tags
  GET api/buscar/noticias/author
  GET api/buscar/noticias/story_title
```
| Type     | Description  (Example)                                 |
| :------- | :------------------------------------------------------|
| `string` | http://localhost:8080/api/buscar/noticias/comment      |

```json
{
    "results": [
        {
            "_id": "627eaee9667b9d8fdc4002b9",
            "created_at": "2022-05-13T07:57:57.000Z",
            "title": null,
            "url": null,
            "author": "Joel_Mckay",
            "points": null,
            "story_text": null,
            "comment_text": "I think the main reason is that untrained EEs end up doing their best to ship product. Since the rise of outsourcing hardware manufacturing, it is simply that domestic demand is now low. Also, most PHBs have zero understanding of low-level systems, and visible areas are easier to quantify value.\nBasically, the kids with 37000 dependencies in their nodejs steaming pile of awesome… are more impressive than some graybeard’s 4 C library solution that needs updated once every 5 years.",
            "num_comments": null,
            "story_id": 31363738,
            "story_title": "A guide to getting started with embedded systems",
            "story_url": "https://yinka.dev/blog/a-guide-to-getting-started-with-embedded-systems/",
            "parent_id": 31364360,
            "created_at_i": 1652428677,
            "_tags": [
                "comment",
                "author_Joel_Mckay",
                "story_31363738"
            ],
            "objectID": "31364615",
            "_highlightResult": {
                "author": {
                    "value": "Joel_Mckay",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "comment_text": {
                    "value": "I think the main reason is that untrained EEs end up doing their best to ship product. Since the rise of outsourcing hardware manufacturing, it is simply that domestic demand is now low. Also, most PHBs have zero understanding of low-level systems, and visible areas are easier to quantify value.\nBasically, the kids with 37000 dependencies in their <em>nodejs</em> steaming pile of awesome… are more impressive than some graybeard’s 4 C library solution that needs updated once every 5 years.",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "nodejs"
                    ]
                },
                "story_title": {
                    "value": "A guide to getting started with embedded systems",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "story_url": {
                    "value": "https://yinka.dev/blog/a-guide-to-getting-started-with-embedded-systems/",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            },
            "estado": true,
            "__v": 0
        },
        {
            "_id": "627eaee9667b9d8fdc4002ba",
            "created_at": "2022-05-13T00:35:18.000Z",
            "title": null,
            "url": null,
            "author": "jeroenhd",
            "points": null,
            "story_text": null,
            "comment_text": "I don&#x27;t know any libraries for this in any good backend languages, but I&#x27;ve worked with these packages in NodeJS to do something like that:<p>- <a href=\"https:&#x2F;&#x2F;www.npmjs.com&#x2F;package&#x2F;http-proxy\" rel=\"nofollow\">https:&#x2F;&#x2F;www.npmjs.com&#x2F;package&#x2F;http-proxy</a><p>- <a href=\"https:&#x2F;&#x2F;www.npmjs.com&#x2F;package&#x2F;connect\" rel=\"nofollow\">https:&#x2F;&#x2F;www.npmjs.com&#x2F;package&#x2F;connect</a><p>- <a href=\"https:&#x2F;&#x2F;www.npmjs.com&#x2F;package&#x2F;harmon\" rel=\"nofollow\">https:&#x2F;&#x2F;www.npmjs.com&#x2F;package&#x2F;harmon</a><p>If you don&#x27;t want to act like a proxy, you&#x27;re going to approach this like a normal web applications that does HTTP requests using whatever HTTP client your framework of choice uses.",
            "num_comments": null,
            "story_id": 31354130,
            "story_title": "Show HN: Mitmproxy2swagger – Automagically reverse-engineer REST APIs",
            "story_url": "https://github.com/alufers/mitmproxy2swagger",
            "parent_id": 31361414,
            "created_at_i": 1652402118,
            "_tags": [
                "comment",
                "author_jeroenhd",
                "story_31354130"
            ],
            "objectID": "31361805",
            "_highlightResult": {
                "author": {
                    "value": "jeroenhd",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "comment_text": {
                    "value": "I don't know any libraries for this in any good backend languages, but I've worked with these packages in <em>NodeJS</em> to do something like that:<p>- <a href=\"https://www.npmjs.com/package/http-proxy\" rel=\"nofollow\">https://www.npmjs.com/package/http-proxy</a><p>- <a href=\"https://www.npmjs.com/package/connect\" rel=\"nofollow\">https://www.npmjs.com/package/connect</a><p>- <a href=\"https://www.npmjs.com/package/harmon\" rel=\"nofollow\">https://www.npmjs.com/package/harmon</a><p>If you don't want to act like a proxy, you're going to approach this like a normal web applications that does HTTP requests using whatever HTTP client your framework of choice uses.",
                    "matchLevel": "full",
                    "fullyHighlighted": false,
                    "matchedWords": [
                        "nodejs"
                    ]
                },
                "story_title": {
                    "value": "Show HN: Mitmproxy2swagger – Automagically reverse-engineer REST APIs",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "story_url": {
                    "value": "https://github.com/alufers/mitmproxy2swagger",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            },
            "estado": true,
            "__v": 0
        },
```


### Configuración del servidor
Por motivos de orden, las configuraciones del servidor se encuentran por separado, en el archivo server.js podemos encontrar las configuraciones tanto de las variables de entorno que nos sirven para conectarnos a la base de datos, establecer los paths de conexion para los endpoints, la configuración de la documentación de swagger, la configuración de las rutas y funciones y el puerto por defecto del servidor.

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

### Conexión a base de datos
Para poder establecer la conexión a la base de datos, estamos ocupando el ODM de mongoose, el que nos facilita la conexión y interacciones con la base de datos de mongodb, nos conectamos a la base de datos establecidas en las variables de entorno.

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
El apartado de los controladores, contiene todas las funcionalidades base de la api, una de las funcionalidades mas importantes esta realizada con un cron, el cual permite ejecutar el llamado a la api cada cierto tiempo de manera indefinida.

### Importaciones de EndPoint Noticias

```javascript
const { default: axios } = require('axios');
const { response, request } = require('express');
const Noticia = require('../models/news')
const cron = require('node-cron')
```
### Funcion para obtener Noticias - EndPoint
La función de obtener noticias contiene el limte de 5 elementos por pagina, y su respectivo contenido.

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
Siempre es importante tener un buscador con un filtro para un elemento y/o dato en especifico.

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
Al ejecutar un cron con la api, podremos controlar las llamadas respectivas a esta, de forma que cada cierto tiempo trae elementos y los inserta en la base de datos.


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
### Función para eliminar noticias - EndPoint
Cuando no nos sirve un elemento, lo podemos eliminar y/o deshabilitar como en este caso, nunca es conveniente eliminar un registro de manera completa de la base de datos, a no ser que sea muy requerido.

```javascript
const newsDelete = async (req, res = response) => {

    const { id } = req.params;
    const noticia = await Noticia.findByIdAndUpdate(id, { estado: false });

    res.json(noticia);
}
```

### Controlador de Búsqueda
Una búsqueda personalizada es un elemento muy importante, ya que podremos acceder a la información que necesitamos.

```javascript
const { response } = require("express")
const { isValidObjectId } = require("mongoose")
const Noticia = require('../models/news')
```
La única coleccion permitida para el filtro de búsquedas es la que lleva el mismo nombre de la base de datos.

```javascript
const coleccionesPermitidas = [
    'noticias'
]
```

Se utiliza un regex en el filtro de búsqueda, el cual nos permitira realizar mejores búsquedas de estos, ya que permite escribir tanto en mayúsculas y minúsculas o ambas.

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

### Ruta para búsqueda de notcias buscar.js

```javascript
const { Router } = require("express")
const { buscar } = require('../controllers/buscar')

const router = Router()

router.get('/:coleccion/:termino', buscar)

module.exports = router;
```
### Ruta para búsqueda de notcias news.js

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
