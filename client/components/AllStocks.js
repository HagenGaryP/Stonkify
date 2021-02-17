import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { StockPreview } from "./index";
import { fetchStocks, fetchSearchedStocks } from "../store";
import axios from 'axios';

/**
 * Component - This will likely be changed to a "watch list"
 */

const AllStocks = ({
  stocks,
  getStocks,
  searchStocks,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    getStocks();
    setData([...data, stocks]);
  }, []);

  useEffect(() => {
    getStocks();
  }, [data]);

  // handle Searched Term
  const handleSearch = async () => {
    let res;
    try {
      res = await searchStocks(searchTerm);
      setData([...data, res]);
      console.log("response = ", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="all-stocks-start">
      <div className="search-container">
        <h1 className="search-header">Search for a stock</h1>
        <form onSubmit={() => handleSearch(searchTerm)}>
          <label>
            <input
              name="search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <button
            className="btn-search"
            type="button"
            onClick={() => handleSearch(searchTerm)}
          >
            Search
          </button>
        </form>
      </div>
      {/* ---------- stocks ----------*/}
      <div className="all-stocks-container">
        {Array.isArray(stocks) &&
          stocks.map((stock) => {
            return <StockPreview key={stock.id} stock={stock} />;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stocks: state.stocks,
});

const mapDispatch = (dispatch) => ({
  getStocks: () => dispatch(fetchStocks()),
  searchStocks: (val) => dispatch(fetchSearchedStocks(val)),
});

export default connect(mapStateToProps, mapDispatch)(AllStocks);
