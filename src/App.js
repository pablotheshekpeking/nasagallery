import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Gallery from './components/Gallery';
import Navbar from './components/Navbar';
import NasaCarousel from './components/Carousel';

const API_KEY = 'tmbtWjmsukDyG3I7AvpcIeFfyg0hxnXK3XdjOs2A';

function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showingResultsFor, setShowingResultsFor] = useState('');

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
  
      // Extract image data from the response
      const imageData = response.data.collection.items.map((item) => ({
        url: item.links[0].href, 
        title: item.data[0].title, 
        explanation: item.data[0].description 
      }));
      
      setImages(imageData);
      setShowingResultsFor(searchQuery);
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
      <NasaCarousel />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {showingResultsFor && <div><h6 style={{color: 'white'}}>Now showing results for: {showingResultsFor}</h6></div>}
      <Gallery images={images} />
    </div>
  );
}

export default App;
