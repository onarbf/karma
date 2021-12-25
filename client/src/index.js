import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from './routes/Home';
import Login from './routes/Login';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={ <Home />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
