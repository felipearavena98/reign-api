const { Router } = require('express');
const { newsGet,
    newsDelete,
    OnenewsGet } = require('../controllers/news');


const router = Router();




// Get api
router.get('/', newsGet)
// Get api one
router.get('/:id', OnenewsGet)

// Delete api
router.delete('/:id', newsDelete)

module.exports = router;