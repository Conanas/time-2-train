import React from 'react';
import Select from 'react-select'
import { useWorkoutContext } from '../../utils/contexts/WorkoutContext';
import { useEditContext } from '../../utils/contexts/EditContext';
import { SET_ACTIONS } from '../../utils/contexts/actions';
import { START } from '../../utils/contexts/edit-state-strings';
import './style.css';

export default function InputList() {
  const [workoutState, dispatchWorkout] = useWorkoutContext();
  const [editState] = useEditContext();

  function getMinutes(seconds) {
    return Math.floor(seconds / 60);
  }

  function getSeconds(seconds) {
    let remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
      return '0' + remainingSeconds;
    }
    return remainingSeconds;
  }

  function createTimeDataList() {
    let timeList = []
    for (let i = 0; i < 60; i++) {
      timeList.push({
        value: i,
        label: i < 10 ? `0${i}` : i
      })
    }
    return timeList;
  }

  function renderWorkoutUnits(key, disable) {
    if (key === "prepare" || key === 'work' || key === 'rest' || key === 'break') {
      let minutes = getMinutes(workoutState[key])
      let seconds = getSeconds(workoutState[key])
      return (
        <>
          <div className="time-units">
            {/* Minutes */}
            <Select
              className="form-input time-unit flow-text"
              defaultValue={{ label: `${minutes}`, value: minutes }}
              options={createTimeDataList()}
              onChange={({ value }) => {
                dispatchWorkout({ type: SET_ACTIONS[`${key}Minutes`], payload: parseInt(value) })
              }}
            />
            :
            {/* Seconds */}
            <Select
              className="form-input time-unit flow-text"
              defaultValue={{ label: `${seconds}`, value: seconds }}
              options={createTimeDataList()}
              onChange={({ value }) => {
                dispatchWorkout({ type: SET_ACTIONS[key], payload: parseInt(value) })
              }}
            />
          </div>
        </>
      )
    } else {
      return (
        <div className="workout-units">
          <input
            className="form-input flow-text"
            type="number"
            value={workoutState[key]}
            disabled={disable === true ? true : false}
            onChange={(e) => {
              dispatchWorkout({ type: SET_ACTIONS[key], payload: parseInt(e.target.value) })
            }}
          />
        </div>
      )
    }
  }

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
        {renderWorkoutUnits(key, disable)}
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