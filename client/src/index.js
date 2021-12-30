import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import RecoverPassword  from './routes/RecoverPassword';
import ConfirmUser  from './routes/ConfirmUser';
import Signin  from './routes/Signin';
import AlertWrapper from './components/AlertWrapper';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/dashboard" element={ <Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/recoverPassword" element={<RecoverPassword />} />
      <Route path="/confirmUser" element={<ConfirmUser />}/>
      <Route path="*" element={ <Home />} />
    </Routes>
    <AlertWrapper/>
  </BrowserRouter>,
  document.getElementById('root')
);
