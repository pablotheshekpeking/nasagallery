import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const API_KEY = process.env.REACT_APP_NASA_API_KEY;
function NasaCarousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`
        );
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images: ', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide duration (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="carousel">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)` // Adjust for the sliding effect
          }}
        >
          <img src={image.url} alt={image.title} width={'200px'} height={'200px'} style={{border: '1px solid white', borderRadius: '20px'}} />
          <p style={{color: 'white'}}>{image.title}</p>
        </div>
      ))}
    </div>
  );
}

export default NasaCarousel;
