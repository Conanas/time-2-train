import React, { useEffect } from 'react';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/GlobalState";
import { SET_ACTIONS } from '../../utils/actions';
import './style.css';

export default function StartEditTimer(props) {
  const [state, dispatch] = useWorkoutContext();

  useEffect(() => {
    let workoutId = "";
    if (localStorage.workoutId) {
      workoutId = localStorage.workoutId;
    } else {
      workoutId = props.match.params.id;
    }
    API.getWorkout(workoutId)
      .then(res => {
        dispatch({ type: SET_ACTIONS.workout, payload: res.data });
      })
      .catch(error => console.log(error))
  }, [])

  function renderListItems(state) {
    const listItems = Object.keys(state).map((key, index) => {

      let disable = false;

      // When we reach the Work object in the state and continuous is set to false then disable the work elements
      if ((key === "work" && state.continuous === false)) {
        disable = true
      }

      if (key === "id") {
        return <></>
      }

      // The input elements JSX for each item in the state object
      let inputs = (
        <>
          <button className="plus-minus-buttons" disabled={disable === true ? true : false}>
            <i className="fa-icon far fa-minus-square flow-text" onClick={disable === false ? (() => dispatch({ type: SET_ACTIONS[key], payload: state[key] - 1 })) : null}></i>
          </button>
          <div className="workout-units flow-text">
            <input className="number-input" type="number" value={state[key]} disabled={disable === true ? true : false} onChange={((e) => dispatch({ type: SET_ACTIONS[key], payload: e.target.value }))} />
          </div>
          <button className="plus-minus-buttons" disabled={disable === true ? true : false}>
            <i className="fa-icon far fa-plus-square flow-text" onClick={disable === false ? (() => dispatch({ type: SET_ACTIONS[key], payload: state[key] + 1 })) : null}></i>
          </button>
        </>
      )

      // When we reach the title element then do not render anything
      if (key === "title") {
        inputs = <span className="flow-text">{state[key]}</span>
      }

      // When we reach the continuous object in the state then render the continuous toggle button
      // If continuous then render 'on' toggle switch
      // Else render the 'off' toggle switch
      if (key === "continuous" && state.continuous === true) {
        inputs = <i className="fa-icon fas fa-toggle-on flow-text" onClick={() => dispatch({ type: SET_ACTIONS.continuous, payload: false })}></i>
      }
      if (key === "continuous" && state.continuous === false) {
        inputs = <i className="fa-icon fas fa-toggle-off flow-text" onClick={() => dispatch({ type: SET_ACTIONS.continuous, payload: true })}></i>
      }

      // Return each item with the title of each object in the state and with the inputs variable
      return (
        <li className="edit-timer-list-item" key={index}>
          <label className="flow-text">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          {inputs}
        </li>
      )
    })
    return listItems;
  }

  return (
    <>
      <div className="row">
        <h4>Start/Edit Workout</h4>
        <ul className="edit-timer-list">
          {renderListItems(state)}
        </ul>
      </div>
      <div className="button-div">
        <input className="form-button" type="button" value="Start"></input>
        <input className="form-button modal-trigger" type="button" value="Save" data-target="save-modal"></input>
      </div>
    </>
  )
}