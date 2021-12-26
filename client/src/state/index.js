import {createGlobalState} from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = createGlobalState({
  signinState: {
    username: "",
    password: "",
    email: ""
  },
  errors: []
})


export {setGlobalState, useGlobalState};
