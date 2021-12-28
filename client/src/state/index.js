import {createGlobalState} from 'react-hooks-global-state';


const initialState = {
  signinState: {
    username: "",
    password: "",
    password2: "",
    email: ""
  },
  loginState:{
    email: "",
    password: ""
  },
  errors: [],
  successAlert: false,
  res: {}
};
const {setGlobalState, useGlobalState} = createGlobalState(initialState)


export {setGlobalState, useGlobalState, initialState};
