// import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Data from './pages/Data';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';


const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/data' element={<Data/>}/>
    </Routes>
    <Footer/>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
