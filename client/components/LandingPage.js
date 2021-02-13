import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="home-page-container">
      {/* <div className="front-page-welcome"> */}
        <div className="front-display-text">
          <h1 className="primary-header">STONKIFY</h1>
          <div className="front-page-buttons">
            <Link to="/stocks">
              <Button variant="outline-light">
                <h2>VIEW STONKZ</h2>
              </Button>
            </Link>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};
