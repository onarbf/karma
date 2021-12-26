import './_.scss';

import Header from '../../components/Header';

import {setGlobalState, useGlobalState} from '../../state';

function Home(){

  return (
    <div className="Home">
      <Header/>
      <div className="content">
      <h1>Home</h1>
      </div>
    </div>
  );
}

export default Home;
