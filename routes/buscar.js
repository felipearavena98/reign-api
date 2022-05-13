const { Router } = require("express")
const { buscar } = require('../controllers/buscar')

const router = Router()

/**
 * @swagger
 * /api/buscar:
 *  get:
 *      summary: Search elements
 *      tags: [Search by terms]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 */

router.get('/:coleccion/:termino', buscar)


module.exports = router;