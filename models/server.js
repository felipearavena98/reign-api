const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const path = require('path');
//Swagger
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

        // Conectar a db
        this.cnnDB();

        // Middlewares
        this.middlewares();

        // Rutas de la app

        this.routes();
    }

    async cnnDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio Publico
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