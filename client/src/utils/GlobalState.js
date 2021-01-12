import React, { createContext, useReducer, useContext } from "react";
import {
  SET_WORKOUT,
  SET_TITLE,
  SET_CONTINUOUS,
  SET_PREPARE,
  SET_REPS,
  SET_WORK,
  SET_REST,
  SET_SETS,
  SET_BREAK
} from './actions';
// import {
//   TITLE,
//   CONTINUOUS,
//   PREPARE,
//   REPS,
//   WORK,
//   REST,
//   SETS,
//   BREAK
// } from './list-titles';

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

// const DEFAULT_STATE = {
//   title: {
//     action: SET_TITLE,
//     title: TITLE,
//     value: "Test Title"
//   },
//   continuous: {
//     action: SET_CONTINUOUS,
//     title: CONTINUOUS,
//     value: false
//   },
//   prepare: {
//     action: SET_PREPARE,
//     title: PREPARE,
//     value: 15,
//   },
//   reps: {
//     action: SET_REPS,
//     title: REPS,
//     value: 4,
//   },
//   work: {
//     action: SET_WORK,
//     title: WORK,
//     value: 0,
//   },
//   rest: {
//     action: SET_REST,
//     title: REST,
//     value: 30,
//   },
//   sets: {
//     action: SET_SETS,
//     title: SETS,
//     value: 3,
//   },
//   break: {
//     action: SET_BREAK,
//     title: BREAK,
//     value: 180,
//   }
// }

const reducer = (state, action) => {
  switch (action.type) {
    // case SET_WORKOUT:
    //   return {
    //     title: {
    //       ...state.title,
    //       value: action.payload.title
    //     },
    //     continuous: {
    //       ...state.title,
    //       value: action.payload.continuous
    //     },
    //     prepare: {
    //       ...state.title,
    //       value: action.payload.prepare
    //     },
    //     reps: {
    //       ...state.title,
    //       value: action.payload.reps
    //     },
    //     work: {
    //       ...state.title,
    //       value: action.payload.work
    //     },
    //     rest: {
    //       ...state.title,
    //       value: action.payload.rest
    //     },
    //     sets: {
    //       ...state.title,
    //       value: action.payload.sets
    //     },
    //     break: {
    //       ...state.title,
    //       value: action.payload.break
    //     }
    //   }
    case SET_TITLE:
      return {
        ...state,
        title: action.payload
      }
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

// const reducer = (state, action) => {
//   switch (action.type) {
//     case SET_WORKOUT:
//       return {
//         title: {
//           ...state.title,
//           value: action.payload.title
//         },
//         continuous: {
//           ...state.title,
//           value: action.payload.continuous
//         },
//         prepare: {
//           ...state.title,
//           value: action.payload.prepare
//         },
//         reps: {
//           ...state.title,
//           value: action.payload.reps
//         },
//         work: {
//           ...state.title,
//           value: action.payload.work
//         },
//         rest: {
//           ...state.title,
//           value: action.payload.rest
//         },
//         sets: {
//           ...state.title,
//           value: action.payload.sets
//         },
//         break: {
//           ...state.title,
//           value: action.payload.break
//         }
//       }
//     case SET_TITLE:
//       return {
//         ...state,
//         title: {
//           ...state.title,
//           value: action.payload
//         }
//       }
//     case SET_CONTINUOUS:
//       return {
//         ...state,
//         continuous: {
//           ...state.continuous,
//           value: action.payload
//         }
//       }
//     case SET_PREPARE:
//       return {
//         ...state,
//         prepare: {
//           ...state.prepare,
//           value: state.prepare.value + action.payload
//         }
//       }
//     case SET_REPS:
//       return {
//         ...state,
//         reps: {
//           ...state.reps,
//           value: state.reps.value + action.payload
//         }
//       }
//     case SET_WORK:
//       return {
//         ...state,
//         work: {
//           ...state.work,
//           value: state.work.value + action.payload
//         }
//       }
//     case SET_REST:
//       return {
//         ...state,
//         rest: {
//           ...state.rest,
//           value: state.rest.value + action.payload
//         }
//       }
//     case SET_SETS:
//       return {
//         ...state,
//         sets: {
//           ...state.sets,
//           value: state.sets.value + action.payload
//         }
//       }
//     case SET_BREAK:
//       return {
//         ...state,
//         break: {
//           ...state.break,
//           value: state.break.value + action.payload
//         }
//       }
//     default:
//       return state;
//   }
// }

const WorkoutProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return <WorkoutContext.Provider value={[state, dispatch]} {...props} />;
};

const useWorkoutContext = () => {
  return useContext(WorkoutContext);
};

export { WorkoutProvider, useWorkoutContext };
