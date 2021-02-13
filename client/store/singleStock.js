import axios from "axios";

const GET_SINGLE_STOCK = "GET_SINGLE_STOCK";

const getSingleStock = (stock) => ({ type: GET_SINGLE_STOCK, stock });

export const fetchSingleStock = (stockId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/stocks/${stockId}`);
    dispatch(getSingleStock(data));
  } catch (err) {
    console.error(err);
  }
};

const defaultSingleStock = {};

export default function (state = defaultSingleStock, action) {
  switch (action.type) {
    case GET_SINGLE_STOCK:
      return action.stock;
    default:
      return state;
  }
}
