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
import {
  CONTINUOUS,
  WORK
} from '../../utils/list-titles';
import './style.css';

export default function StartEditTimer() {
  const [state, dispatch] = useWorkoutContext();

  function renderListItems(state) {
    const listItems = Object.keys(state).map(key => {
      let inputs = <>
        <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: state[key].action, payload: -1 })}></i>
        <div className="workout-units flow-text">
          <input type="number" value={state[key].value} />
        </div>
        <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: state[key].action, payload: +1 })}></i>
      </>;
      if (state[key].title === CONTINUOUS) {
        if (state[key].value === true) {
          inputs = <i className="fa-icon fas fa-toggle-on flow-text" onClick={() => dispatch({ type: state.continuous.action, payload: false })}></i>
        } else {
          inputs = <i className="fa-icon fas fa-toggle-off flow-text" onClick={() => dispatch({ type: state.continuous.action, payload: true })}></i>
        }
      } else if (state[key].title === WORK) {
        if (state.continuous.value === false) {
          return (<></>)
        }
      }
      return (
        <li className="edit-timer-list-item">
          <label className="flow-text">{state[key].title}</label>
          {inputs}
        </li>
      )
    })
    return listItems;
  }

  return (
    <>
      <h1 className="flow-text">Start/Edit Workout</h1>
      <ul className="edit-timer-list">
        {renderListItems(state)}
      </ul>
      <input className="form-button" type="button" value="Start"></input>
      <input className="form-button" type="button" value="Save"></input>
      <input className="form-button" type="button" value="Load"></input>
    </>
  )
}