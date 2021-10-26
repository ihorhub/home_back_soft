const express = require('express')

const authentication = require('../../middlewares/authentication')
const UserValidation = require('./UserValidation')
const UserController = require('./UserController')
const TaskController = require('../task/TaskController')

const app = express()

app.post('/api/user/', UserValidation.validateUser, UserController.create)

app.post('/api/user/login/', UserValidation.validateUser, UserController.login)
app.get('/api/user/test/', UserValidation.validateUser, TaskController.getTasks)
module.exports = app
