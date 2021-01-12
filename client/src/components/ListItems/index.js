import React from 'react';
import { useWorkoutContext } from "../../utils/GlobalState";
import { TITLES } from '../../utils/list-titles';
import { SET_ACTIONS } from '../../utils/actions';
import './style.css';

export default function ListItems() {
  const [state, dispatch] = useWorkoutContext();

  function renderListItems(state) {
    const listItems = Object.keys(state).map(key => {

      // The input elements JSX for each item in the state object
      let inputs = (
        <>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_ACTIONS[key], payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input className="number-input" type="number" value={state[key]} />
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_ACTIONS[key], payload: 1 })}></i>
        </>
      )

      // When we reach the continuous object in the state then render the continuous toggle button
      // If continuous then render 'on' toggle switch
      // Else render the 'off' toggle switch
      if (TITLES[key] === TITLES.continuous && state.continuous === true) {
        inputs = <i className="fa-icon fas fa-toggle-on flow-text" onClick={() => dispatch({ type: SET_ACTIONS.continuous, payload: false })}></i>
      }
      if (TITLES[key] === TITLES.continuous && state.continuous === false) {
        inputs = <i className="fa-icon fas fa-toggle-off flow-text" onClick={() => dispatch({ type: SET_ACTIONS.continuous, payload: true })}></i>
      }

      // When we reach the Work object in the state and continuous is set to false then do not render the work element
      else if (TITLES[key] === TITLES.work && state.continuous === false || TITLES[key] === TITLES.title) {
        return <></>
      }

      // Return each item with the title of each object in the state and with the inputs variable
      return (
        <li className="edit-timer-list-item">
          <label className="flow-text">{TITLES[key]}</label>
          {inputs}
        </li>
      )
    })
    return listItems;
  }

  return (
    renderListItems(state)
  )
}