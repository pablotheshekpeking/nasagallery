// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Gallery from './components/Gallery';
import Navbar from './components/Navbar';

const API_KEY = process.env.REACT_APP_NASA_API_KEY;

function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=30`
      );
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images: ', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://images-api.nasa.gov/search?q=${searchQuery}`
      );
      setImages(response.data.collection.items);
    } catch (error) {
      console.error('Error searching images: ', error);
    }
  };

  return (
    <div className="App">
      <div className='nasasvg'>
          <img src='/ufo.svg' alt='ufo' />
          <img src='/shut.svg' alt='shuttle' />
          <img src='/saturn.svg' alt='saturn' />
          <img src='/solar.svg' alt='solar' />
      </div>
      <Navbar />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Gallery images={images} />
    </div>
  );
}

export default App;
