import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ImageDetail from './imagedetails';
import Home from './components/Home';


function App() {

  return (
    <Router>
      <div className="App">
        <div className='nasasvg'>
            <img src='/ufo.svg' alt='ufo' />
            <img src='/shut.svg' alt='shuttle' />
            <img src='/saturn.svg' alt='saturn' />
            <img src='/solar.svg' alt='solar' />
        </div>
        <Link target='_blank' to={'/'}>
        <Navbar />
        </Link>
        <Route path='/' exact component={Home} />
        <Route path='/details/:date' component={ImageDetail} />
      </div>
    </Router>
  );
}

export default App;
