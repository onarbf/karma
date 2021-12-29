import './_.scss';
import Header from '../../components/Header';


import {setGlobalState, useGlobalState, initialState} from '../../state';

function Signin(){

  const [signinState] = useGlobalState("signinState");
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
        password2: signinState.password2,
        email: signinState.email
      })
    })
    response = await response.json();

    if (response.status !== "error") {
        setGlobalState("signinState", {...initialState.signinState});
        setGlobalState("successAlert",{message:"User created! Check your email"});

        setTimeout(()=>{
          window.location = '/'
        },3000)
    }
    setGlobalState("res",response);
  }
  return(
    <div className="Signin">
      <Header/>
      <div className="content">
        <h1>Signin</h1>
        <form>
          <p>Username</p>
          <input type="text" onChange={handleChange} name="username" placeholder="introduce your Username..."></input>
          <p>Email</p>
          <input type="text" onChange={handleChange} name="email" placeholder="introduce your Email..."></input>
          <p>Password</p>
          <input type="password"  onChange={handleChange} name="password" placeholder="Introduce your password"></input>
          <p>Repeat password</p>
          <input type="password"  onChange={handleChange} name="password2" placeholder="Repeat your password"></input>
          <button type="submit" onClick={handleSubmit}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Signin;
