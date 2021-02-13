const router = require('express').Router();
const { Stock } = require('../db/models');
const { Op } = require('sequelize');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;

module.exports = router;

// get all Stocks
router.get('/', async (req, res, next) => {
  try {
    const stocks = await Stock.findAll();
    res.json(stocks);
  } catch (err) {
    next(err);
  }
});

// Get Stock by id
router.get('/:id', async (req, res, next) => {
  try {
    const stock = await Stock.findByPk(req.params.id);
    res.json(stock);
  } catch (err) {
    next(err);
  }
});

//Add a new Stock
router.post('/add', async (req, res, next) => {
  try {
    const createStock = await Stock.create(req.body);
    res.json(createStock);
  } catch (err) {
    next(err);
  }
});

//Delete
router.delete('/:id', async (req, res, next) => {
  try {
    const numOfDeleted = await Stock.destroy({
      where: { id: req.params.id },
    });
    res.json(numOfDeleted);
  } catch (err) {
    next(err);
  }
});

// search new Stocks to add to DB
router.get('/search/:searchTerm', async (req, res, next) => {
  let response;
  try {
    response = await fetchSearch(req.params.searchTerm);
    res.send(response.data)
  } catch (error) {
    next(error);
  }
})

const fetchSearch = async (searchTerm) => {
  let data = '';
  let config = {
    method: 'get',
    url: `https://api.somewebsite.com/search?q=${searchTerm}`,
    headers: {
      'api-auth-obj-key-name': `${API_KEY}`,
    },
    data: data,
  };
  return axios(config)
    .then((response) => {
      data = response.data;
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
