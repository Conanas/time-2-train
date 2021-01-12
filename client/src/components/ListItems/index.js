import React from 'react';
import { useWorkoutContext } from "../../utils/GlobalState";
import { TITLES } from '../../utils/list-titles';
import { SET_ACTIONS } from '../../utils/actions';
import './style.css';

export default function ListItems() {
  const [state, dispatch] = useWorkoutContext();

  function renderListItems(state) {
    const listItems = Object.keys(state).map((key, index) => {

      let disable = false;

      // When we reach the Work object in the state and continuous is set to false then do not render the work element
      if ((TITLES[key] === TITLES.work && state.continuous === false)) {
        disable = true
      }

      if (TITLES[key] === TITLES.title) {
        return <></>
      }

      // The input elements JSX for each item in the state object
      let inputs = (
        <>
          <i className="fa-icon far fa-minus-square flow-text" disabled={disable === true ? true : false} onClick={disable === false ? (() => dispatch({ type: SET_ACTIONS[key], payload: state[key] - 1 })) : null}></i>
          <div className="workout-units flow-text">
            <input className="number-input" type="number" value={disable === false ? state[key] : 0} disabled={disable === true ? true : false} onChange={((e) => dispatch({ type: SET_ACTIONS[key], payload: e.target.value }))} />
          </div>
          <i className="fa-icon far fa-plus-square flow-text" disabled={disable === true ? true : false} onClick={disable === false ? (() => dispatch({ type: SET_ACTIONS[key], payload: state[key] + 1 })) : null}></i>
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

      // Return each item with the title of each object in the state and with the inputs variable
      return (
        <li className="edit-timer-list-item" key={index}>
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
