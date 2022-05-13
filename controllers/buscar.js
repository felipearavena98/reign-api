const { response } = require("express")
const { isValidObjectId } = require("mongoose")
const Noticia = require('../models/news')


const coleccionesPermitidas = [
    'noticias'
]

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


module.exports = {
    buscar
}