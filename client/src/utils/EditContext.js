import React, { createContext, useReducer, useContext } from "react";
import { START, EDIT, CREATE } from "./actions";

const EditContext = createContext();

const DEFAULT_STATE = [START]

const reducer = (state, action) => {
  switch (action.type) {
    case START:
      return START
    case EDIT:
      return EDIT
    case CREATE:
      return CREATE
    default:
      return state;
  }
}

const EditProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return <EditContext.Provider value={[state, dispatch]} {...props} />;
};

const useEditContext = () => {
  return useContext(EditContext);
};

export { EditProvider, useEditContext };
