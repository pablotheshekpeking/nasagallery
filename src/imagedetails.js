import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

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
    return <div style={{paddingTop: '300px'}}><ClipLoader color="#36d7b7" /></div>;
  }

  if (error) {
    return <div style={{paddingTop: '300px'}}><p style={{ color: 'red', backgroundColor: 'black', padding: '20px', borderRadius: '20px' }}>{error}</p></div>;
  } 

  return (
    <div className="detailimg">
      <h2>{imageData.title}</h2>
      <img src={imageData.url} alt={imageData.title} />
      <p style={{ backgroundColor: 'black', padding: '20px', borderRadius: '20px' }}>{imageData.explanation}</p>
    </div>
  );
};

export default ImageDetail;
