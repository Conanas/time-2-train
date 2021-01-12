import React, { createContext, useReducer, useContext } from "react";
import { SET_ACTIONS } from './actions';

const WorkoutContext = createContext();

const DEFAULT_STATE = {
  title: "Test Title",
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
    case SET_ACTIONS.workout:
      return {
        title: action.payload.title,
        continuous: action.payload.continuous,
        prepare: action.payload.prepare,
        reps: action.payload.reps,
        work: action.payload.work,
        rest: action.payload.rest,
        sets: action.payload.sets,
        break: action.payload.break
      }
    case SET_ACTIONS.title:
      return {
        ...state,
        title: action.payload
      }
    case SET_ACTIONS.continuous:
      if (action.payload === false) {
        return {
          ...state,
          continuous: action.payload,
          work: 0
        }
      }
      return {
        ...state,
        continuous: action.payload
      }
    case SET_ACTIONS.prepare:
      return {
        ...state,
        prepare: action.payload
      }
    case SET_ACTIONS.reps:
      return {
        ...state,
        reps: action.payload
      }
    case SET_ACTIONS.work:
      return {
        ...state,
        work: action.payload
      }
    case SET_ACTIONS.rest:
      return {
        ...state,
        rest: action.payload
      }
    case SET_ACTIONS.sets:
      return {
        ...state,
        sets: action.payload
      }
    case SET_ACTIONS.break:
      return {
        ...state,
        break: action.payload
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
