import Header from '../../components/Header';
import {setGlobalState, useGlobalState, initialState} from '../../state';

function Login(){

  const [loginState] = useGlobalState("loginState");
  const [res] = useGlobalState("res");

  const handleChange = (e)=>{
    loginState[e.target.name] = e.target.value;
    setGlobalState("loginState",loginState);
    console.log(loginState);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log('wtf');
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
        window.location = '/';
        setGlobalState("successAlert",{message:"User logged!"});
        setGlobalState("loginState", initialState.loginState);
    }
    setGlobalState("res",response);
  }

  return(
    <div className="Home">
      <Header/>
      <div className="content">
        <h1>Login</h1>
        <form>
          <p>Email</p>
          <input type="text" name="email" onChange={handleChange} placeholder="introduce your email..."></input>
          <p>Password</p>
          <input type="password" placeholder="introduce your password"></input>
          <button type="submit" onClick={handleSubmit}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
