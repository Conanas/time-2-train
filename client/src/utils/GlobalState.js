import React, { createContext, useReducer, useContext } from "react";
import {
  SET_CONTINUOUS,
  SET_PREPARE,
  SET_REPS,
  SET_WORK,
  SET_REST,
  SET_SETS,
  SET_BREAK
} from './actions';

const WorkoutContext = createContext();

const DEFAULT_STATE = {
  continuous: false,
  prepare: 15,
  reps: 4,
  work: 0,
  rest: 30,
  sets: 3,
  break: 180
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CONTINUOUS:
      return {
        ...state,
        continuous: action.payload
      }
    case SET_PREPARE:
      return {
        ...state,
        prepare: state.prepare + action.payload
      }
    case SET_REPS:
      return {
        ...state,
        reps: state.reps + action.payload
      }
    case SET_WORK:
      return {
        ...state,
        work: state.work + action.payload
      }
    case SET_REST:
      return {
        ...state,
        rest: state.rest + action.payload
      }
    case SET_SETS:
      return {
        ...state,
        sets: state.sets + action.payload
      }
    case SET_BREAK:
      return {
        ...state,
        break: state.break + action.payload
      }
    default:
      return state;
  }
}

const WorkoutProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return <WorkoutContext.Provider value={[state, dispatch]} {...props} />;
};

const useWorkoutContext = () => {
  return useContext(WorkoutContext);
};

export { WorkoutProvider, useWorkoutContext };
