import './_.scss';
import { Link } from "react-router-dom";
import {setGlobalState, useGlobalState, initialState} from '../../state';
import React, { useEffect } from 'react';

function Header() {
  const [isAuth] = useGlobalState("isAuth");

    useEffect(async ()=>{
      console.log("isAuth",isAuth);
      const token = localStorage.getItem("currentToken");
      if (!isAuth) {
        let response = await fetch('/api/user/checkJWT',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': token
          }
        })
        const res = await response.json();
        if (res.response) {
            setGlobalState("isAuth",true);
        }

      }
    },[])

    const logout = async ()=>{
      localStorage.removeItem("currentToken");
      setGlobalState("isAuth",false);
    }

  return (
    <div className="Header">
      <h1><Link to="/" >Karma App</Link></h1>
      <h2>Welcome to this beautiful app</h2>
      <div className="menu">
        {!isAuth && <Link to="/signin">Signin</Link>}
        {!isAuth && <Link to="/login">Login</Link>}
        {isAuth &&<Link to="/dashboard" >Dashboard</Link>}
        {isAuth && <button className="link" onClick={logout} to="/logout">Logout</button>}
      </div>
    </div>
  );
}

export default Header;
