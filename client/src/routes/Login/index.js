import './_.scss';
import Header from '../../components/Header';
import { Link } from "react-router-dom";
import {setGlobalState, useGlobalState, initialState} from '../../state';

function Login(){

  const [loginState] = useGlobalState("loginState");

  const handleChange = (e)=>{
    loginState[e.target.name] = e.target.value;
    setGlobalState("loginState",loginState);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    let response = await fetch('/api/user/loginUser',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginState.email,
        password: loginState.password
      })
    })
    response = await response.json();

    if (response.status !== "error") {
        setGlobalState("successAlert",{message:"User logged!"});
        setGlobalState("loginState",{ ...initialState.loginState});

        //Setting the json web token to add it on all the calls
        localStorage.setItem('currentToken', `JWT ${response.response.token}`);
        setTimeout(()=>{
          window.location = '/'
        },3000)
    }
    setGlobalState("res",response);
  }

  return(
    <div className="Login">
      <Header/>
      <div className="content">
        <h1>Login</h1>
        <form>
          <p>Email</p>
          <input type="text" name="email" onChange={handleChange} placeholder="introduce your email..."></input>
          <p>Password</p>
          <input type="password" name="password" onChange={handleChange} placeholder="introduce your password"></input>
          <button type="submit" onClick={handleSubmit}>Send</button>
        </form>
        <Link to="/recoverPassword">¿You don't remember your password?</Link>
      </div>
    </div>
  )
}

export default Login;
