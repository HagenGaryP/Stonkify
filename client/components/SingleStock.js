import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { fetchSingleStock } from '../store';


const SingleStock = ({
  stock,
  fetchStock,
  match
}) => {
  useEffect(() => {
    fetchStock(match.params.id)
  }, [])

  return (
    <div className="single-stock-container">
      <div className="single-stock-info-container">
        <h2>{stock.company}</h2>
        <h3> {stock.ticker}: {stock.price} </h3>
        <div className="single-stock-description">
          {stock.description}
        </div>
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    stock: state.singleStock,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchStock: (stockId) => dispatch(fetchSingleStock(stockId))
  }
}

export default connect(mapState, mapDispatch)(SingleStock);
