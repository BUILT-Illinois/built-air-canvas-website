import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Data from './pages/Data';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/data" element={<Data />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;