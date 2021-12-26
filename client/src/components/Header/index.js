import './_.scss';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="Header">
      <h1>Karma App</h1>
      <h2>Welcome to this beautiful app</h2>
      <div className="menu">
        <Link to="/" >Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signin">Signin</Link>
      </div>
    </div>
  );
}

export default Header;
