const express = require('express')
const userController = require('./controllers/userController')
const routes = express.Router();

// user routes--

routes.post('/user/signup', userController.signup)
routes.post('/user/signin', userController.signin)
routes.get('/user/showAll', userController.showAll)
routes.delete('/user/delete', userController.delete)

// --user routes


module.exports = routes