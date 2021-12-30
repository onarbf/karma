import './_.scss';

import Header from '../../components/Header';
import {Navigate} from 'react-router-dom';
import {useGlobalState} from '../../state';

function Dashboard(){
  const [isAuth] = useGlobalState('isAuth');
  return (
    <div>
    {!isAuth && <Navigate to="/" replace={true} />}
    <div className="Dashboard">
      <Header/>
      <div className="content">
      <h1>Dashboard</h1>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
