import {createGlobalState} from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = createGlobalState({
  hi: "hi"
})


export {setGlobalState, useGlobalState};
