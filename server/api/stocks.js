const router = require('express').Router();
const { Stock } = require('../db/models');
const { Op } = require('sequelize');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;

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
router.post('/:ticker', async (req, res, next) => {
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

// Internal API call to search for a stock externally
router.get('/search/:searchTerm', async (req, res, next) => {
  let [month, date, year] = new Date().toLocaleDateString("en-US").split("/")
  // making sure we get the last day the stock was traded, by setting date
  switch (new Date().getDay()) {
    case 1:
      // day = "Monday";
      if (date > 3) {
        date -= 3;
      }
      // needs the else condition - this will include changing to previous month
      // and also checking how many days are in the previous month
      break;
    case 0:
      // sunday
      if (date > 2) {
        date -= 2;
      }
      break;
    case 6:
      // saturday
      if (date > 1) {
        date -= 1;
      }
      break;
    default:
      if (date > 1) {
        date -= 1;
      }
      break;
  }
  console.log('month = ', month, '  date = ', date, ' year = ', year);
  if (month < 10) {
    month = '0' + month;
  }
  if (date < 10) {
    date = '0' + date;
  }
  const previousDate = year + '-' + month + '-' + date;
  // console.log('previous date = ', previousDate);
  try {
    const stockTicker = req.params.searchTerm.toUpperCase();

    // this responds with the stock ticker and company name
    const { data } = await axios.get(`https://api.polygon.io/v2/reference/tickers?sort=ticker&locale=us&search=${stockTicker}&perpage=5&page=1&apiKey=${API_KEY}`)
    // response = await fetchStock(req.params.searchTerm);
    // this responds with the price info for that stock
    const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${stockTicker}/range/1/day/${previousDate}/${previousDate}?apiKey=${API_KEY}`);

    console.log('data >>>>> ', data);
    console.log('response.data >>>>> ', response.data);

    // add the stock to DB and update the price
    // setting current price key/value on data obj
    if (response.data.results) {
      console.log('RESPONSE DATA RESULTS =======', response.data.results);
      data.price = response.data.results[0].c;
    }
    console.log('data.price = ', data.price)
    const stockToUpdate = await Stock.findOrCreate({
      where: {
        ticker: data.tickers[0].ticker,
        company: data.tickers[0].name,
      }
    })
    const [rowsUpdated, updatedStock] = await Stock.update(
      {
        price: data.price,
      },
      {
        where: {ticker: stockTicker},
        returning: true,
        plain: true,
      }
    )
    res.json(updatedStock);
  } catch (error) {
    next(error);
  }
})

// Call to external API
const fetchStock = async (stockTicker) => {
  let data = '';
  let config = {
    method: 'get',
    url: `https://api.polygon.io/v2/aggs/ticker/${stockTicker}/range/1/day/2021-02-12/2021-02-12?apiKey=${API_KEY}`,
    data: data,
  };
  console.log('fetching the stock with ticker ', stockTicker, 'The data is >>>>>>>>>>>> ', data);

  return axios(config)
    .then((response) => {
      data = response.data;
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchSearch = async (stockTicker) => {
  let data = '';
  let config = {
    method: 'get',
    url: `https://api.polygon.io/v2/aggs/ticker/${stockTicker}/range/1/day/2020-06-01/2020-06-17?apiKey=${API_KEY}`,
    // headers: {
    //   'Api-req-object-key': `${API_KEY}`,
    // },
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

module.exports = router;
