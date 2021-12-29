import Header from '../../components/Header';
import {setGlobalState, useGlobalState, initialState} from '../../state';

function RecoverPassword(){

  const [recoverPasswordState] = useGlobalState("recoverPasswordState");
  const [res] = useGlobalState("res");

  const handleChange = (e)=>{
    recoverPasswordState[e.target.name] = e.target.value;
    setGlobalState("recoverPasswordState",recoverPasswordState);
    console.log(recoverPasswordState);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log('wtf');
    let response = await fetch('/api/user/recoverPassword',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: recoverPasswordState.password
      })
    })
    response = await response.json();

    setGlobalState("res",response);
  }

  return(
    <div className="Home">
      <Header/>
      <div className="content">
        <h1>Recover your password</h1>
        <form>
          <p>Introduce the email that you used to register</p>
          <input type="text" name="email" onChange={handleChange} placeholder="introduce your email..."></input>
          <button type="submit" onClick={handleSubmit}>Recover your password</button>
        </form>
      </div>
    </div>
  )
}

export default RecoverPassword;
