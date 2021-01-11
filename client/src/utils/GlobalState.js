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
import {
  CONTINUOUS,
  PREPARE,
  REPS,
  WORK,
  REST,
  SETS,
  BREAK
} from './list-titles';

const WorkoutContext = createContext();

const DEFAULT_STATE = {
  continuous: {
    action: SET_CONTINUOUS,
    title: CONTINUOUS,
    value: false
  },
  prepare: {
    action: SET_PREPARE,
    title: PREPARE,
    value: 15,
  },
  reps: {
    action: SET_REPS,
    title: REPS,
    value: 4,
  },
  work: {
    action: SET_WORK,
    title: WORK,
    value: 0,
  },
  rest: {
    action: SET_REST,
    title: REST,
    value: 30,
  },
  sets: {
    action: SET_SETS,
    title: SETS,
    value: 3,
  },
  break: {
    action: SET_BREAK,
    title: BREAK,
    value: 180,
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CONTINUOUS:
      return {
        ...state,
        continuous: {
          ...state.continuous,
          value: action.payload
        }
      }
    case SET_PREPARE:
      return {
        ...state,
        prepare: {
          ...state.prepare,
          value: state.prepare.value + action.payload
        }
      }
    case SET_REPS:
      return {
        ...state,
        reps: {
          ...state.reps,
          value: state.reps.value + action.payload
        }
      }
    case SET_WORK:
      return {
        ...state,
        work: {
          ...state.work,
          value: state.work.value + action.payload
        }
      }
    case SET_REST:
      return {
        ...state,
        rest: {
          ...state.rest,
          value: state.rest.value + action.payload
        }
      }
    case SET_SETS:
      return {
        ...state,
        sets: {
          ...state.sets,
          value: state.sets.value + action.payload
        }
      }
    case SET_BREAK:
      return {
        ...state,
        break: {
          ...state.break,
          value: state.break.value + action.payload
        }
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
