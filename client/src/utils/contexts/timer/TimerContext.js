import React, { createContext, useReducer, useContext } from "react";
import ACTIONS from './actions';
import BACKGROUND_STATES from './backgroundStates';
import TIMER_MODES from './timerModes';

const TimerContext = createContext();

const DEFAULT_STATE = {
  timerState: {
    mode: TIMER_MODES.PREPARE,
    countdown: null,
    rep: 1,
    set: 1
  },
  playState: false,
  backgroundState: BACKGROUND_STATES.DEFAULT
}

const reducer = (state, action) => {
  switch (action.type) {

    default:
      return state;
  }
}

const TimerProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return <TimerContext.Provider value={[state, dispatch]} {...props} />;
};

const useTimerContext = () => {
  return useContext(TimerContext);
};

export { TimerProvider, useTimerContext };