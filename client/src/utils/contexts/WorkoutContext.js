import React, { createContext, useReducer, useContext } from "react";
import { SET_ACTIONS } from './actions';

const WorkoutContext = createContext();

const DEFAULT_STATE = {
  title: "Quick Start",
  continuous: false,
  prepare: 0,
  reps: 2,
  work: 0,
  rest: 3,
  sets: 2,
  break: 3
}

const reducer = (state, action) => {
  let seconds = 0;
  let minutes = 0;
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
      if (action.payload.length > 24) {
        return state
      }
      return {
        ...state,
        title: action.payload
      }
    case SET_ACTIONS.continuous:
      if (action.payload === false) {
        return {
          ...state,
          continuous: action.payload,
          work: 0,
          prepare: 0
        }
      }
      return {
        ...state,
        continuous: action.payload
      }
    case SET_ACTIONS.prepare:
      minutes = Math.floor(state.prepare / 60);
      return {
        ...state,
        prepare: minutes * 60 + action.payload
      }
    case SET_ACTIONS.prepareMinutes:
      seconds = action.payload * 60;
      minutes = Math.floor(state.prepare / 60);
      return {
        ...state,
        prepare: state.prepare - minutes * 60 + seconds
      }
    case SET_ACTIONS.reps:
      return {
        ...state,
        reps: action.payload
      }
    case SET_ACTIONS.work:
      minutes = Math.floor(state.work / 60);
      return {
        ...state,
        work: minutes * 60 + action.payload
      }
    case SET_ACTIONS.workMinutes:
      seconds = action.payload * 60;
      minutes = Math.floor(state.work / 60);
      return {
        ...state,
        work: state.work - minutes * 60 + seconds
      }
    case SET_ACTIONS.rest:
      minutes = Math.floor(state.rest / 60);
      return {
        ...state,
        rest: minutes * 60 + action.payload
      }
    case SET_ACTIONS.restMinutes:
      seconds = action.payload * 60;
      minutes = Math.floor(state.rest / 60);
      return {
        ...state,
        rest: state.rest - minutes * 60 + seconds
      }
    case SET_ACTIONS.sets:
      return {
        ...state,
        sets: action.payload
      }
    case SET_ACTIONS.break:
      minutes = Math.floor(state.break / 60);
      return {
        ...state,
        break: minutes * 60 + action.payload
      }
    case SET_ACTIONS.breakMinutes:
      seconds = action.payload * 60;
      minutes = Math.floor(state.break / 60);
      return {
        ...state,
        break: state.break - minutes * 60 + seconds
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
