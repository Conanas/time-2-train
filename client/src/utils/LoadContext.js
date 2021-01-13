import React, { createContext, useReducer, useContext } from "react";

const LoadContext = createContext();

const DEFAULT_STATE = {

}

const reducer = (state, action) => {
  switch (action.type) {

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
