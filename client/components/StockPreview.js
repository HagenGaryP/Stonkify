import React, { useState } from 'react';
import history from '../history';


function StockPreview({ stock }) {

  return (
    <div className="stock-card">
      <p className="stock-card-name">
        {stock.company}
      </p>
      <div className="stock-card-textarea">
          {stock.ticker} : ${stock.price}
      </div>
      {stock.description}
    </div>
  );
}

export default StockPreview;
