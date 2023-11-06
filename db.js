const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://admin:1234@cluster0.indy3hy.mongodb.net/employee_db'

mongoose.set('strictQuery', false)

module.exports = () => {
    return mongoose.connect(dbUri,
        { useNewUrlParser: true, useUnifiedTopology: true })
}