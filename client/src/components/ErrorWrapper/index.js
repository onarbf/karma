import './_.scss';

import {setGlobalState, useGlobalState} from '../../state';

function ErrorWrapper() {
  const [errors] = useGlobalState('errors');
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

  const renderErrors = ()=>{
    return errors.map((error, id)=>{
      console.log(id);
      return (
        <div key={id} className="Error">
          <button onClick={()=>{removeError(id)}} className="close-icon">X</button>
          {error.message}
        </div>
        )
    })

  }

  return (
    <div className="ErrorWrapper">
      {renderErrors()}
    </div>
  );
}

export default ErrorWrapper;
