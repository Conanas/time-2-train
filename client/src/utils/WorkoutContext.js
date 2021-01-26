import React, { createContext, useReducer, useContext } from "react";
import { SET_ACTIONS } from './actions';

const WorkoutContext = createContext();

const DEFAULT_STATE = {
  title: "Quick Start",
  continuous: true,
  prepare: 5,
  reps: 4,
  work: 10,
  rest: 5,
  sets: 3,
  break: 10
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACTIONS.workout:
      return {
        _id: action.payload._id,
        title: action.payload.title,
        continuous: action.payload.continuous,
        prepare: action.payload.prepare,
        reps: action.payload.reps,
        work: action.payload.work,
        rest: action.payload.rest,
        sets: action.payload.sets,
        break: action.payload.break
      }
    case SET_ACTIONS.id:
      return {
        ...state,
        _id: action.payload
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
      if (state.prepare + action.payload < 0) {
        return {
          ...state,
          prepare: 0
        }
      }
      return {
        ...state,
        prepare: action.payload
      }
    case SET_ACTIONS.reps:
      if (state.reps + action.payload <= 1) {
        return {
          ...state,
          reps: 1
        }
      }
      return {
        ...state,
        reps: action.payload
      }
    case SET_ACTIONS.work:
      if (state.work + action.payload < 0) {
        return {
          ...state,
          work: 0
        }
      }
      return {
        ...state,
        work: action.payload
      }
    case SET_ACTIONS.rest:
      if (state.rest + action.payload < 0) {
        return {
          ...state,
          rest: 0
        }
      }
      return {
        ...state,
        rest: action.payload
      }
    case SET_ACTIONS.sets:
      if (state.sets + action.payload <= 1) {
        return {
          ...state,
          sets: 1
        }
      }
      return {
        ...state,
        sets: action.payload
      }
    case SET_ACTIONS.break:
      if (state.break + action.payload < 0) {
        return {
          ...state,
          break: 0
        }
      }
      return {
        ...state,
        break: action.payload
      }
    case SET_ACTIONS.reset:
      return DEFAULT_STATE
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
