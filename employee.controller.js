const express = require('express')
const router = express.Router()

const Employee = require('../models/employee.model')
const { generateCrudeMethods } = require('../services/index')
const employeeCrud = generateCrudeMethods(Employee)
const { validateDbId, raiseRecord404Error } = require('../middlewares/index')

router.get('/', (req, res, next) => {
    employeeCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
})

router.get('/:id', validateDbId, (req, res, next) => {
        employeeCrud.getById(req.params.id)
            .then(data => {
                if (data)
                    res.send(data)
                else
                raiseRecord404Error(req, res)
            })
            .catch(err => next(err))
})

router.post('/insert/', (req, res, next) => {
    employeeCrud.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
})

router.put('/update/:id', validateDbId, (req, res, next) => { 
    employeeCrud.update(req.params.id,req.body)
    .then(data => {
        if (data)
            res.send(data)
        else
        raiseRecord404Error(req, res, next)
    })
    .catch(err => next(err))
})

router.delete('/delete/:id', validateDbId, (req, res, next) => { 
    employeeCrud.delete(req.params.id,req.body)
    .then(data => {
        if (data)
        res.send(data)
    else
    raiseRecord404Error(req, res, next)
})
.catch(err => next(err))
})


module.exports = router