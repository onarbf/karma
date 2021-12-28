 import './_.scss';

import {setGlobalState, useGlobalState} from '../../state';

function AlertWrapper() {
  const [errors] = useGlobalState('errors');
  const [successAlert] = useGlobalState('successAlert');
  const [res] = useGlobalState('res');

  if (res.status === "error") {
    setGlobalState("errors",res.errors);
    setGlobalState("res",{});
  }
  const removeError = async (index)=>{
      const notRemovedErrors = errors.filter((error,id)=>{
        return(index !== id)
      })
      setGlobalState("errors",notRemovedErrors);
  }

  const removeSuccess = async (index)=>{
    setGlobalState("successAlert","");
  }

  const renderErrors = ()=>{
    return errors.map((error, id)=>{
      return (
        <div key={id} className="Alert error">
          <button onClick={()=>{removeError(id)}} className="close-icon">X</button>
          {error.message}
        </div>
        )
    })
  }

  const renderSuccess = ()=>{
      return (
      <div className="Alert success">
        <button onClick={()=>{removeSuccess()}} className="close-icon">X</button>
        {successAlert.message}
      </div>
      )
  }
  return (
    <div className="AlertWrapper">
      {renderErrors()}
      {successAlert?renderSuccess():""}
    </div>
  );
}

export default AlertWrapper;
