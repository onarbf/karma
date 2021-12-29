import './_.scss';
import Header from '../../components/Header';
import React, { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import {setGlobalState, useGlobalState, initialState} from '../../state';

function RecoverPassword(){

  const [searchParams, setSearchParams] = useSearchParams();

  const [recoverPasswordState] = useGlobalState("recoverPasswordState");

  useEffect(async () => {
    const userId = searchParams.get("userId")
    const token =  searchParams.get("token")
    let response = await fetch(`api/user/recoverPassword2/${userId}/${token}`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
    response = await response.json();
    if (response.status != "error") {
      recoverPasswordState.tokenIsTrue = true;
      setGlobalState("recoverPasswordState",recoverPasswordState);
    }
  })

  const RenderForm = ()=>{

    const emailForm = (<form>
        <p>Introduce the email that you used to register</p>
        <input type="text" name="email" onChange={handleChange} placeholder="introduce your email..."></input>
        <button type="submit" onClick={handleSubmit}>Recover your password</button>
      </form>)
    const passwordForm = (<form>
        <p>Introduce the new password</p>
        <input type="text" name="password" onChange={handleChange} placeholder="introduce your email..."></input>
        <input type="text" name="password2" onChange={handleChange} placeholder="introduce your email..."></input>
        <button type="submit" onClick={handleSubmit}>Recover your password</button>
      </form>)

      return recoverPasswordState.tokenIsTrue?passwordForm:emailForm;
  }

  const handleChange = (e)=>{
    recoverPasswordState[e.target.name] = e.target.value;
    setGlobalState("recoverPasswordState",recoverPasswordState);
    console.log(recoverPasswordState);
  }


  const handleSubmit = async (e)=>{
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
      setGlobalState(recoverPasswordState,initialState.recoverPasswordState);
    }

    setGlobalState("res",response);
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
