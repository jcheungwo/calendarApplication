const Sequelize = require('sequelize');
const db = require('../db');

const Event = db.define('events', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timeStart: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timeEnd: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  location: {
    type: Sequelize.STRING
  }
})

module.exports = Event;
