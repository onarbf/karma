import './_.scss';
import Header from '../../components/Header';
import React, { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import {setGlobalState, useGlobalState, initialState} from '../../state';

function ConfirmUser(){
  const [searchParams] = useSearchParams();


  useEffect(async () => {
    const userId = searchParams.get("userId")
    const token =  searchParams.get("token")
    console.log(userId,token);
    let response = await fetch(`/api/user/confirmUser/${userId}/${token}`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
    response = await response.json();
    if (response.status != "error") {
        setGlobalState("successAlert", {message:"User created! Check your email"});
        setTimeout(()=>{
          window.location = "/login"
        },3000)
    }
    setGlobalState("res",response);

  },[]);

  return(
    <div className="ConfirmUser">
      <Header/>
      <div className="content">
        <h1></h1>
      </div>
    </div>
  )
}

export default ConfirmUser;
