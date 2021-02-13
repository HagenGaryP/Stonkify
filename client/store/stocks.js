/* eslint-disable no-case-declarations */
import axios from 'axios';

export const SEARCH_STOCKS = 'SEARCH_STOCKS';
export const GET_STOCKS = 'GET_STOCKS';
export const ADD_STOCK = 'ADD_STOCK';
export const REMOVE_STOCK = 'REMOVE_STOCK';

const searchStocks = (stocks) => ({ type: SEARCH_STOCKS, stocks });
const getStocks = (stocks) => ({ type: GET_STOCKS, stocks });
const addStock = (stock) => ({ type: ADD_STOCK, stock });
const removeStock = (StockId) => ({ type: REMOVE_STOCK, StockId });

export const fetchSearchedStocks = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/stocks/search/${searchTerm}`);
    dispatch(searchStocks(data));
  } catch (err) {
    console.error(err);
  }
};


export const fetchStocks = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/stocks');
    dispatch(getStocks(data));
  } catch (err) {
    console.error(err);
  }
};

export const newStock = (info) => async (dispatch) => {
  if (Array.isArray(info)) {
    info = info[0];
  }
  try {
    const { data } = await axios.post('/api/stocks/add', info);
    dispatch(addStock(data));
  } catch (error) {
    console.error(error);
  }
};

export const removedStock = (stockId) => async (dispatch) => {
  try {
    await axios.delete(`/api/stocks/${stockId}`);
    dispatch(removeStock(stockId));
  } catch (error) {
    console.error(error);
  }
};

const defaultStocks = [];

export default function (state = defaultStocks, action) {
  switch (action.type) {
    case GET_STOCKS:
      return [...action.stocks];
    case ADD_STOCK:
      return [...state, action.stock];
    case REMOVE_STOCK:
      const filteredStock = state.filter(
        (stock) => stock.id !== action.stockId
      );
      return filteredStock;
    default:
      return state;
  }
}
