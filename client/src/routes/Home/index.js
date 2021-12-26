import './_.scss';

import Header from '../../components/Header';

import {setGlobalState, useGlobalState} from '../../state';

function Home(){
  const getHi = async () => {
    const response = await fetch('/api/hi')
      const hi = await response.json();
      setGlobalState('hi',hi.response);
  }
  const [hi] = useGlobalState('hi')

  return (
    <div className="Home">
      <Header/>
      <div className="content">
        <h1>Home</h1>
        <p>{hi}</p>
        <button onClick={getHi}>Click me!</button>
      </div>
    </div>
  );
}

export default Home;
