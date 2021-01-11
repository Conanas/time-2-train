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
          {if (state.continuous === true) {
            return (
              <i className="fas fa-toggle-on flow-text"></i>
            )
          } else {
            return (
              <i className="fas fa-toggle-off flow-text"></i>
            )
          }}
        </li>

        {/* Prepare */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Prepare</label>
          <i className="far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_PREPARE, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <span>{state.prepare}</span>
          </div>
          <i className="far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_PREPARE, payload: +1 })}></i>
        </li>

        {/* Reps */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Reps</label>
          <i className="far fa-minus-square flow-text"></i>
          <div className="workout-units flow-text">
            <span>0</span>
          </div>
          <i className="far fa-plus-square flow-text"></i>
        </li>

        {/* Work */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Work</label>
          <i className="far fa-minus-square flow-text"></i>
          <div className="workout-units flow-text">
            <span>0</span>
          </div>
          <i className="far fa-plus-square flow-text"></i>
        </li>

        {/* Rest */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Rest</label>
          <i className="far fa-minus-square flow-text"></i>
          <div className="workout-units flow-text">
            <span>0</span>
          </div>
          <i className="far fa-plus-square flow-text"></i>
        </li>

        {/* Sets */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Sets</label>
          <i className="far fa-minus-square flow-text"></i>
          <div className="workout-units flow-text">
            <span>0</span>
          </div>
          <i className="far fa-plus-square flow-text"></i>
        </li>

        {/* Break */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Break</label>
          <i className="far fa-minus-square flow-text"></i>
          <div className="workout-units flow-text">
            <span>0</span>
          </div>
          <i className="far fa-plus-square flow-text"></i>
        </li>

      </ul>
      <input className="form-button" type="button" value="Start"></input>
      <input className="form-button" type="button" value="Save"></input>
      <input className="form-button" type="button" value="Load"></input>
    </>
  )
}