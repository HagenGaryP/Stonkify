import React, { useState } from 'react';
import history from '../history';


function StockPreview({ stock }) {

  return (
    <div className="stock-card">
      <p className="stock-card-name">
        {stock.company}
      </p>
      <div className="stock-ticker-and-price">
          {stock.ticker} : ${stock.price}
      </div><br/>
        <h5>Company description:</h5><br/>
      <div className="stock-card-textarea">
        {stock.description}
      </div>
    </div>
  );
}

export default StockPreview;
