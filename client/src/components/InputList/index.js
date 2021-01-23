import React from 'react';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import { useEditContext } from '../../utils/EditContext';
import { SET_ACTIONS, EDIT, START } from '../../utils/actions';
import './style.css';

export default function InputList() {
  const [workoutState, dispatchWorkout] = useWorkoutContext();
  const [editState, dispatchEdit] = useEditContext();

  return Object.keys(workoutState).map((key, index) => {

    let disable = false;

    // When we reach the Work object in the state and continuous is set to false then disable the work elements
    if ((key === "work" && workoutState.continuous === false) || editState === START) {
      disable = true
    }

    // Don't render an item for the workout ID
    if (key === "_id") {
      return null;
    }

    // The input elements JSX for each item in the state object
    let inputs = (
      <>
        <button className="font-awesome-buttons" disabled={disable === true ? true : false}>
          <i
            className="fa-icon far fa-minus-square flow-text"
            onClick={
              disable === false ?
                () => {
                  dispatchWorkout({ type: SET_ACTIONS[key], payload: workoutState[key] - 1 })
                }
                : null
            }>
          </i>
        </button>
        <div className="workout-units">
          <input
            className="form-input flow-text"
            type="number"
            value={workoutState[key]}
            disabled={disable === true ? true : false}
            onChange={(e) => {
              dispatchWorkout({ type: SET_ACTIONS[key], payload: e.target.value })
            }}
          />
        </div>
        <button className="font-awesome-buttons" disabled={disable === true ? true : false}>
          <i className="fa-icon far fa-plus-square flow-text"
            onClick={
              disable === false ?
                () => {
                  dispatchWorkout({ type: SET_ACTIONS[key], payload: workoutState[key] + 1 })
                }
                : null
            }>
          </i>
        </button>
      </>
    )

    // When we reach the title element then do not render anything
    if (key === "title") {
      inputs =
        <input
          className="form-input flow-text"
          disabled={disable === true ? true : false}
          onChange={(e) => {
            dispatchWorkout({ type: SET_ACTIONS[key], payload: e.target.value })
          }}
          value={workoutState[key]}
        />
    }

    // When we reach the continuous object in the state then render the continuous toggle button
    // If continuous then render 'on' toggle switch
    // Else render the 'off' toggle switch
    if (key === "continuous" && workoutState.continuous === true) {
      inputs =
        <div className="continuous-icon-div">
          <button className="font-awesome-buttons" disabled={disable === true ? true : false}>
            <i
              className="fa-icon fas fa-toggle-on flow-text"
              onClick={disable === false ?
                () => {
                  dispatchWorkout({ type: SET_ACTIONS.continuous, payload: false })
                }
                : null}>
            </i>
          </button>
        </div >
    }
    if (key === "continuous" && workoutState.continuous === false) {
      inputs =
        <div className="continuous-icon-div">
          <button className="font-awesome-buttons" disabled={disable === true ? true : false}>
            <i
              className="fa-icon fas fa-toggle-off flow-text"
              onClick={
                disable === false ?
                  () => {
                    dispatchWorkout({ type: SET_ACTIONS.continuous, payload: true })
                  }
                  : null}>
            </i>
          </button>
        </div>
    }

    // Return each item with the title of each object in the state and with the inputs variable
    return (
      <li className="edit-timer-list-item" key={index}>
        <label className="flow-text">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
        {inputs}
      </li>
    )
  })
}