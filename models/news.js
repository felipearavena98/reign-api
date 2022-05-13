const { Schema, model } = require('mongoose');

//Create Docs api
/** 
 * @swagger
 * components:
 *  schemas:
 *      NoticiaSchema:
 *          type: object
 *          properties:
 *              created_at:
 *                  type: string
 *                  description:
 *              title:
 *                  type: string
 *              url:
 *                  type: string
 *              author:
 *                  type: string
 *              points:
 *                  type: string
 *              story_text:
 *                  type: string
 *              comment_text:
 *                  type: string
 *              num_comments:
 *                  type: string
 *              story_id:
 *                  type: number
 *              story_title:
 *                  type: string
 *              story_url:
 *                  type: string
 *              parent_id:
 *                  type: number
 *              created_at_i:
 *                  type: number
 *              _tags:
 *                  type: array
 *              objectID:
 *                  type: string
 *              _highlightResult:
 *                  type: object
 *              estado:
 *                  type: boolean
*/


const NoticiaSchema = Schema({
    created_at: {
        type: String
    },
    title: {
        type: String
    },
    url: {
        type: String
    },
    author: {
        type: String
    },
    points: {
        type: String
    },
    story_text: {
        type: String
    },
    comment_text: {
        type: String
    },
    num_comments: {
        type: String
    },
    story_id: {
        type: Number
    },
    story_title: {
        type: String
    },
    story_url: {
        type: String
    },
    parent_id: {
        type: Number
    },
    created_at_i: {
        type: Number
    },
    _tags: {
        type: Array
    },
    objectID: {
        type: String
    },
    _highlightResult: {
        type: Object
    },
    estado: {
        type: Boolean,
        default: true
    }
});


module.exports = model('Noticia', NoticiaSchema);
