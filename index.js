const express = require('express');
const bodyParser = require('body-parser');

const connectDb = require('./db.js')
const employeeRoutes = require('./controllers/employee.controller.js')
const { errorHandler } = require('./middlewares/index.js')

const app = express()


app.use(bodyParser.json())
app.use('/api/employees', employeeRoutes)
app.use(errorHandler)

connectDb()
    .then(() => { 
        console.log('db connection successfull');
        app.listen(3000,
            () => console.log('server started at 3000'))
    })
    .catch(err => console.log(err))