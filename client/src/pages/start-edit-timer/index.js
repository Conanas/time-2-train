import React, { useEffect } from 'react';
import SaveMessageModal from '../../components/SaveMessageModal';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/WorkoutContext";
import { useEditContext } from '../../utils/EditContext';
import { SET_ACTIONS, EDIT, CREATE, START } from '../../utils/actions';
import './style.css';

export default function StartEditTimer(props) {
  const [editState, dispatchEditState] = useEditContext();
  const [state, dispatch] = useWorkoutContext();

  useEffect(() => {
    let workoutId = "";
    if (localStorage.workoutId) {
      workoutId = localStorage.workoutId;
    } else {
      workoutId = props.match.params.id;
    }
    console.log(workoutId)
    API.getWorkout(workoutId)
      .then(res => {
        dispatch({ type: SET_ACTIONS.workout, payload: res.data });
      })
      .catch(error => console.log(error))
  }, [])

  // Function to render the different workout attributes to be edited
  function renderListItems(state) {
    return Object.keys(state).map((key, index) => {

      let disable = false;

      // When we reach the Work object in the state and continuous is set to false then disable the work elements
      if ((key === "work" && state.continuous === false) || editState === START) {
        disable = true
      }

      // Don't render an item for the workout ID
      if (key === "id") {
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
                  () => dispatch({ type: SET_ACTIONS[key], payload: state[key] - 1 })
                  : null
              }>
            </i>
          </button>
          <div className="workout-units">
            <input
              className="form-input flow-text"
              type="number"
              value={state[key]}
              disabled={disable === true ? true : false}
              onChange={(e) => dispatch({ type: SET_ACTIONS[key], payload: e.target.value })}
            />
          </div>
          <button className="font-awesome-buttons" disabled={disable === true ? true : false}>
            <i className="fa-icon far fa-plus-square flow-text"
              onClick={
                disable === false ?
                  () => dispatch({ type: SET_ACTIONS[key], payload: state[key] + 1 })
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
            onChange={(e) => dispatch({ type: SET_ACTIONS[key], payload: e.target.value })}
            value={state[key]}
          />
      }

      // When we reach the continuous object in the state then render the continuous toggle button
      // If continuous then render 'on' toggle switch
      // Else render the 'off' toggle switch
      if (key === "continuous" && state.continuous === true) {
        inputs =
          <button className="font-awesome-buttons" disabled={disable === true ? true : false}>
            <i
              className="fa-icon fas fa-toggle-on flow-text"
              onClick={disable === false ?
                () => dispatch({ type: SET_ACTIONS.continuous, payload: false })
                : null}>
            </i>
          </button>
      }
      if (key === "continuous" && state.continuous === false) {
        inputs =
          <button className="font-awesome-buttons" disabled={disable === true ? true : false}>
            <i
              className="fa-icon fas fa-toggle-off flow-text"
              onClick={
                disable === false ?
                  () => dispatch({ type: SET_ACTIONS.continuous, payload: true })
                  : null}>
            </i>
          </button >
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

  return (
    <>
      {console.log(editState)}
      <div className="row">
        <h4>Start/Edit Workout</h4>
        <ul className="edit-timer-list">
          {renderListItems(state)}
        </ul>
      </div>
      <div className="button-div">
        {editState === START ?
          <>
            <button className="form-button">
              <i class="fas fa-play"></i>
            </button>
            <button className="form-button" onClick={() => dispatchEditState({ type: EDIT })}>
              <i className="fas fa-edit"></i>
            </button>
          </>
          :
          <button
            className="form-button modal-trigger"
            type="button"
            data-target="save-message-modal"
            onClick={() => dispatchEditState({ type: START })}>
            <i className="far fa-save"></i>
          </button>}
      </div>
      <SaveMessageModal />
    </>
  )
}