import React from 'react';
import '../App.css';

const Gallery = ({ images }) => {
  const openImage = (imageUrl) => {
    window.open(imageUrl, '_blank'); 
  };

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div key={index} className="image-card" onClick={() => openImage(image.url)}>
          <img src={image.url} alt={image.title} />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
