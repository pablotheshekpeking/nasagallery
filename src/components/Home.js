import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Gallery from './Gallery';
import NasaCarousel from './Carousel'
import { CiSearch } from "react-icons/ci";
import { ClipLoader } from 'react-spinners';

const API_KEY = process.env.REACT_APP_NASA_API_KEY;

function Home() {
  const [images, setImages] = useState([1]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showingResultsFor, setShowingResultsFor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`
      );
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://images-api.nasa.gov/search?q=${searchQuery}`
      );

      if (response.data.collection.items.length === 0) {
        setError('No images found for the search query');
      } else {
        const imageData = response.data.collection.items.map((item) => ({
          url: item.links[0].href,
          title: item.data[0].title,
          explanation: item.data[0].description
        }));

        setImages(imageData);
        setShowingResultsFor(searchQuery);
        setError('');
      }
    } catch (error) {
      console.error('Error searching images: ', error);
      setError('An error occurred while searching images');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=30`
      );
      setImages(prevImages => [...prevImages, ...response.data]);
    } catch (error) {
      console.error('Error fetching more images: ', error);
      setError('An error occurred while fetching more images');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <NasaCarousel />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit"><CiSearch className='searchicon' /></button>
      </form>
      {loading ? (
        (<ClipLoader color="#36d7b7" />)
      ) : (
        showingResultsFor && (
          <div>
            <h6 style={{ color: 'white' }}>Now showing results for: {showingResultsFor}</h6>
          </div>
        )
      )}

      {error && <p style={{ color: 'red', backgroundColor: 'black', padding: '20px' }}>Sorry your search query doesnt match any images in our gallery</p>}
      {!error && <Gallery images={images} />}
      {loading && <ClipLoader color="#36d7b7" />}
      {!loading && (
        <button className='showmore' onClick={handleLoadMore} disabled={loading}>
          Show More...
        </button>
      )}
    </div>
  );
}

export default Home;
