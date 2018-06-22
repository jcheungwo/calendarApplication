const router = require('express').Router()
const { Event } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Event.findAll()
  .then(events => res.json(events))
  .catch((err) => console.log(err))
})

router.get('/:id', (req, res, next) => {
  Event.findOne({where: {id: req.params.id}})
  .then(event => res.json(event))
  .catch((err) => console.log(err))
})

router.post('/', (req, res, next) => {
  Event.create(req.body)
  .then(newEvent => res.json(`${newEvent.title} has been created`))
  .catch((err) => console.log(err))
})

router.delete('/:id', (req, res, next) => {
  Event.destroy({where: {id: req.params.id}})
  .then(() => res.json(`Event with id number ${req.params.id} has been deleted`))
  .catch((err) => console.log(err))
})

router.put('/:id', (req, res, next) => {
  Event.update(req.body, {where: {id: req.params.id}})
  .then(() => res.json(`Event with id number ${req.params.id} has been updated`))
  .catch((err) => console.log(err))
})
