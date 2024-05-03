import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import axios from 'axios';

const API_BASE_URL = 'https://api.nasa.gov/planetary/apod';

const ImageDetail = () => {
  const { date } = useParams();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImageData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_BASE_URL, {
          params: {
            api_key: process.env.REACT_APP_NASA_API_KEY,
            date: date,
            concept_tags: true
          }
        });
        if (!response.data) {
          throw new Error('No data found for the given date');
        }
        setImageData(response.data);
      } catch (error) {
        setError('Error fetching image data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImageData();
  }, [date]);

  if (loading) {
    return <p style={{ color:'white', paddingTop: '300px' }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', paddingTop: '300px' }}>{error}</p>;
  } 

  return (
    <div className="detailimg">
      <h2>{imageData.title}</h2>
      <img src={imageData.url} alt={imageData.title} />
      <p>{imageData.explanation}</p>
    </div>
  );
};

export default ImageDetail;
