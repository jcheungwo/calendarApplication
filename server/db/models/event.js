const Sequelize = require('sequelize');
const db = require('../db');

const Event = db.define('events', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startYear: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  startMonth: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  startDay: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  startTime: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endYear: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  endMonth: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  endDay: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  endTime: {
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
