import React, { useEffect } from 'react';
import SaveMessageModal from '../../components/SaveMessageModal';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/WorkoutContext";
import { useEditContext } from '../../utils/EditContext';
import { userUserContext, useUserContext } from '../../utils/UserContext';
import { SET_ACTIONS, EDIT, START } from '../../utils/actions';
import './style.css';

export default function StartEditTimer(props) {
  const [editState, dispatchEditState] = useEditContext();
  const [state, dispatch] = useWorkoutContext();
  const [userState, dispatchUser] = useUserContext();

  useEffect(() => {
    let workoutId = "";
    if (localStorage.workoutId) {
      workoutId = localStorage.workoutId;
    } else {
      workoutId = props.match.params.id;
    }
    API.getWorkout(workoutId)
      .then(res => {
        if (res.data) {
          dispatch({ type: SET_ACTIONS.workout, payload: res.data });
        }
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
          <div className="continuous-icon-div">
            <button className="font-awesome-buttons" disabled={disable === true ? true : false}>
              <i
                className="fa-icon fas fa-toggle-on flow-text"
                onClick={disable === false ?
                  () => dispatch({ type: SET_ACTIONS.continuous, payload: false })
                  : null}>
              </i>
            </button>
          </div>
      }
      if (key === "continuous" && state.continuous === false) {
        inputs =
          <div className="continuous-icon-div">
            <button className="font-awesome-buttons" disabled={disable === true ? true : false}>
              <i
                className="fa-icon fas fa-toggle-off flow-text"
                onClick={
                  disable === false ?
                    () => dispatch({ type: SET_ACTIONS.continuous, payload: true })
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

  return (
    <>
      <div className="row">
        <h4>{editState === START ? "Start" : "Edit"} Workout</h4>
        <ul className="edit-timer-list">
          {renderListItems(state)}
        </ul>
      </div>
      <div className="button-div">
        {editState === START ?
          <>
            <button className="form-button">
              <i className="fas fa-play flow-text"></i>
            </button>
            <button className="form-button" onClick={() => dispatchEditState({ type: EDIT })}>
              <i className="fas fa-edit flow-text"></i>
            </button>
          </>
          :
          <>
            {userState.email === null ?
              null
              :
              <button
                className="form-button modal-trigger"
                data-target="save-message-modal">
                <i className="fas fa-save flow-text"></i>
              </button>}
            <button className="form-button" onClick={() => dispatchEditState({ type: START })}>
              <i class="fas fa-check-square flow-text"></i>
            </button>
          </>
        }
      </div>
      <SaveMessageModal />
    </>
  )
}