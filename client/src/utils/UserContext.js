import React, { createContext, useReducer, useContext } from "react";
import { SET_ACTIONS } from './actions';

const UserContext = createContext();

const DEFAULT_STATE = {
  _id: null,
  email: null,
  givenName: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACTIONS.userLogin:
      return {
        _id: action.payload._id,
        email: action.payload.email,
        givenName: action.payload.givenName,
      }
    case SET_ACTIONS.userLogout:
      return DEFAULT_STATE
    default:
      return state;
  }
}

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return <UserContext.Provider value={[state, dispatch]} {...props} />;
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };