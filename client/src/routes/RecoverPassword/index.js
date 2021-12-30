import './_.scss';
import Header from '../../components/Header';
import React, { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import {setGlobalState, useGlobalState, initialState} from '../../state';

function RecoverPassword(){

  const [searchParams, setSearchParams] = useSearchParams();

  const [recoverPasswordState] = useGlobalState("recoverPasswordState");
  const userId = searchParams.get("userId")
  const token =  searchParams.get("token")

  useEffect(async () => {

    console.log('recoverPasswordState', await recoverPasswordState.tokenIsTrue);
    let response = await fetch(`api/user/recoverPassword2/${userId}/${token}`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
    response = await response.json();
    console.log(response);
    if (response.status != "error") {
      recoverPasswordState.tokenIsTrue = true;
      console.log('working');
      setGlobalState("recoverPasswordState",{...recoverPasswordState});
    }
  },[])

  const handleChange = (e)=>{
    recoverPasswordState[e.target.name] = e.target.value;
    setGlobalState("recoverPasswordState",recoverPasswordState);
    console.log(recoverPasswordState);
  }

  const handleEmailSubmit = async (e)=>{
    e.preventDefault();
    console.log(recoverPasswordState.email);
    let response = await fetch('/api/user/recoverPassword',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: recoverPasswordState.email
      })
    })

    response = await response.json();

    if (response.status !== "error") {
      setGlobalState("successAlert",{message:"If an email exists, we send an email to recover your password."});
      setGlobalState("recoverPasswordState",{...initialState.recoverPasswordState});
    }

    setGlobalState("res",response);
  }

  const handlePasswordSubmit = async (e)=>{
    e.preventDefault();
    console.log('12');
    let response = await fetch(`api/user/recoverPassword2/${userId}/${token}`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
      password: recoverPasswordState.password,
      password2: recoverPasswordState.password2
    })})

    response = await response.json();

    if (response.status !== "error") {
      setGlobalState("successAlert",{message:"Password recovered! That will be perfect"});
      setGlobalState("recoverPasswordState",{...initialState.recoverPasswordState});
    }

    setGlobalState("res",response);
  }

  const RenderForm = ()=>{
    const emailForm = (<div className="form">
        <p>Introduce the email that you used to register</p>
        <input key="input1" type="text" name="email" onChange={handleChange} placeholder="introduce your email..."></input>
        <button type="submit" onClick={handleEmailSubmit}>Recover your password</button>
      </div>)
    const passwordForm = (<div className="form">
        <p>Introduce the new password</p>
        <input key="input2" type="password" name="password" onChange={handleChange} placeholder="Introduce the new password"></input>
        <input key="input3" type="password" name="password2" onChange={handleChange} placeholder="repeat password"></input>
        <button type="submit" onClick={handlePasswordSubmit}>Recover your password</button>
      </div>)

      return recoverPasswordState.tokenIsTrue?passwordForm:emailForm;
  }


  return(
    <div className="RecoverPassword">
      <Header/>
      <div className="content">
        <h1>Recover your password</h1>
        <RenderForm />
      </div>
    </div>
  )
}

export default RecoverPassword;
