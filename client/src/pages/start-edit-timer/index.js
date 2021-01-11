import React from 'react';
import { useWorkoutContext } from "../../utils/GlobalState";
import {
  SET_CONTINUOUS,
  SET_PREPARE,
  SET_REPS,
  SET_WORK,
  SET_REST,
  SET_SETS,
  SET_BREAK
} from '../../utils/actions';
import './style.css';

export default function StartEditTimer() {
  const [state, dispatch] = useWorkoutContext();

  return (
    <>
      <h1 className="flow-text">Start/Edit Workout</h1>
      <ul className="edit-timer-list">

        {/* Continuous */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Continuous</label>
          {
            state.continuous === true ?
              <i className="fa-icon fas fa-toggle-on flow-text" onClick={() => dispatch({ type: SET_CONTINUOUS, payload: false })}></i> :
              <i className="fa-icon fas fa-toggle-off flow-text" onClick={() => dispatch({ type: SET_CONTINUOUS, payload: true })}></i>
          }
        </li>

        {/* Prepare */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Prepare</label>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_PREPARE, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input>{state.prepare}</input>
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_PREPARE, payload: +1 })}></i>
        </li>

        {/* Reps */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Reps</label>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_REPS, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input>{state.reps}</input>
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_REPS, payload: +1 })}></i>
        </li>

        {/* Work */}
        {state.continuous === true ?
          <li className="edit-timer-list-item">
            <label className="flow-text">Work</label>
            <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_WORK, payload: -1 })}></i>
            <div className="workout-units flow-text">
              <input>{state.work}</input>
            </div>
            <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_WORK, payload: +1 })}></i>
          </li> :
          null}

        {/* Rest */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Rest</label>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_REST, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input>{state.rest}</input>
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_REST, payload: +1 })}></i>
        </li>

        {/* Sets */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Sets</label>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_SETS, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input>{state.sets}</input>
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_SETS, payload: +1 })}></i>
        </li>

        {/* Break */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Break</label>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_BREAK, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input>{state.break}</input>
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_BREAK, payload: +1 })}></i>
        </li>

      </ul>
      <input className="form-button" type="button" value="Start"></input>
      <input className="form-button" type="button" value="Save"></input>
      <input className="form-button" type="button" value="Load"></input>
    </>
  )
}