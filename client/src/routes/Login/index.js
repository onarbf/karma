import Header from '../../components/Header';

function Login(){
  return(
    <div className="Home">
      <Header/>
      <div className="content">
        <h1>Login</h1>
        <form>
          <p>Email</p>
          <input type="text" placeholder="introduce your email..."></input>
          <p>Password</p>
          <input type="password" placeholder="introduce your password"></input>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
