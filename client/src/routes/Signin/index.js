import Header from '../../components/Header';
import ErrorWrapper from '../../components/ErrorWrapper';

import {setGlobalState, useGlobalState} from '../../state';

function Signin(){

  const [signinState] = useGlobalState("signinState");
  const [res] = useGlobalState("res");

  const handleChange = (e)=>{
    signinState[e.target.name] = e.target.value;
    setGlobalState("signinState",signinState);

  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    let response = await fetch('/api/user/createUser',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signinState.username,
        password: signinState.password,
        email: signinState.email
      })
    })
    response = await response.json();
    setGlobalState("res", response);
  }
  return(
    <div className="Home">
      <Header/>
      <ErrorWrapper/>
      <div className="content">
        <h1>Signin</h1>
        <form>
          <p>Username</p>
          <input type="text" onChange={handleChange} name="username" placeholder="introduce your Username..."></input>
          <p>Email</p>
          <input type="text" onChange={handleChange} name="email" placeholder="introduce your Email..."></input>
          <p>Password</p>
          <input type="password"  onChange={handleChange} name="password" placeholder="Introduce your password"></input>
          <button type="submit" onClick={handleSubmit}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Signin;
