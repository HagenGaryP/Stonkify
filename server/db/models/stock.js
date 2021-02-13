const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Stock;
