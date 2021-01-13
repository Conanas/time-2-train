import React, { createContext, useReducer, useContext } from "react";
import { SET_ACTIONS } from "./actions";

const LoadContext = createContext();

const DEFAULT_STATE = []

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACTIONS.import:
      return action.payload
    default:
      return state;
  }
}

const LoadProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return <LoadContext.Provider value={[state, dispatch]} {...props} />;
};

const useLoadContext = () => {
  return useContext(LoadContext);
};

export { LoadProvider, useLoadContext };
