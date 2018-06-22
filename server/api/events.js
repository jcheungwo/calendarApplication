const router = require('express').Router()
const { Event } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Event.findAll({
    // attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch((err) => console.log(err))
})
