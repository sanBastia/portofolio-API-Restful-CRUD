var express = require('express')
var router = express.Router()
const controllers = require('../controllers/data')
/* GET users listing. */

router.post('/data', controllers.create)
router.get('/data', controllers.read)
router.delete('/data', controllers.delete)
router.post('/edit', controllers.update)
router.get('/edit/:id', controllers.beforeUpdate)
router.post('/search', controllers.search)

// user.username neh dapet dari app.js ne
module.exports = router
