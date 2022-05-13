const { default: axios } = require('axios');
const { response, request } = require('express');
const Noticia = require('../models/news')
const cron = require('node-cron')

// Obtener Noticias
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

// Obtener Noticia

const OnenewsGet = async (req, res = response, next) => {
    const { id } = req.params;
    const noticia = await Noticia.findById(id)

    if (!noticia) {
        res.json({ msg: 'No se puede realizar la búsqueda' })
        next()
    }

    res.json(noticia)
}



cron.schedule('*/59 * * * *', async () => {

    const instance = await axios('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
    const datos = instance.data.hits
    await Noticia.insertMany(datos)

    res.json({
        msg: 'post API - controlador',
        datos
    })

})


const newsDelete = async (req, res = response) => {

    const { id } = req.params;
    const noticia = await Noticia.findByIdAndUpdate(id, { estado: false });

    res.json(noticia);
}


module.exports = {
    newsGet,
    newsDelete,
    OnenewsGet
}