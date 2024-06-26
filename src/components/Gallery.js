import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import '../App.css';

const Gallery = ({ images }) => {
  return (
    <Router>
      <div className="gallery">
        {images.map((image, index) => (
          <div key={index} className="image-card">
            <Link target="_blank" to={`/details/${image.date}`}>
              <img className='skeleton' src={image.url} alt={image.title} />
            </Link>
          </div>
        ))}
      </div>
    </Router>
  );
};

export default Gallery;
