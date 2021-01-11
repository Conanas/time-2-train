import React from 'react';
import { useWorkoutContext } from "../../utils/GlobalState";
import {
  CONTINUOUS,
  WORK
} from '../../utils/list-titles';
import './style.css';

export default function StartEditTimer() {
  const [state, dispatch] = useWorkoutContext();

  function renderListItems(state) {
    const listItems = Object.keys(state).map(key => {

      // The input elements JSX for each item in the state object
      let inputs = (
        <>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: state[key].action, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input type="number" value={state[key].value} />
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: state[key].action, payload: +1 })}></i>
        </>
      )

      // When we reach the continuous object in the state then render the continuous toggle button
      // If continuous then render 'on' toggle switch
      // Else render the 'off' toggle switch
      if (state[key].title === CONTINUOUS && state[key].value === true) {
        inputs = <i className="fa-icon fas fa-toggle-on flow-text" onClick={() => dispatch({ type: state.continuous.action, payload: false })}></i>
      }
      if (state[key].title === CONTINUOUS && state[key].value === false) {
        inputs = <i className="fa-icon fas fa-toggle-off flow-text" onClick={() => dispatch({ type: state.continuous.action, payload: true })}></i>
      }

      // When we reach the Work object in the state and continuous is set to false then do not render the work element
      else if (state[key].title === WORK && state.continuous.value === false) {
        return <></>
      }

      // Return each item with the title of each object in the state and with the inputs variable
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