var express = require('express')
var router = express.Router()
const controllers = require('../controllers/user')
/* GET users listing. */

router.post('/register', controllers.register)

router.post('/login', controllers.login)
// user.username neh dapet dari app.js ne
module.exports = router
