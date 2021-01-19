import React, { createContext, useReducer, useContext } from "react";
import { SET_ACTIONS } from './actions';

const UserContext = createContext();

const DEFAULT_STATE = {
  _id: null,
  email: null,
  googleId: null,
  givenName: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACTIONS.user:
      return {
        _id: state._id,
        email: null,
        googleId: null,
        givenName: null,
      }
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