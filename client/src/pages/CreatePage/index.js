import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import InputList from '../../components/InputList/';
import MessageModal from '../../components/Modals/MessageModal/';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/WorkoutContext";
import { useEditContext } from '../../utils/EditContext';
import { useUserContext } from '../../utils/UserContext';
import { EDIT, MESSAGES, SET_ACTIONS } from '../../utils/actions';
import './style.css';

export default function CreatePage() {
  const [saveState, setSaveState] = useState();
  const [, dispatchEditState] = useEditContext();
  const [workoutState, dispatchWorkout] = useWorkoutContext();
  const [userState] = useUserContext();

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
    dispatchEditState({ type: EDIT })
    dispatchWorkout({ type: SET_ACTIONS.reset })
  }, [])

  async function saveWorkout() {
    try {
      if (workoutState.title === "") {
        setSaveState(MESSAGES.MUST_BE_A_TITLE);
      } else {
        let existingWorkout = await API.getWorkoutByTitle(workoutState.title, userState._id);
        if (existingWorkout.data != null) {
          setSaveState(MESSAGES.WORKOUT_EXISTS);
        } else {
          let createdWorkout = await API.postWorkout(userState._id, workoutState);
          await API.putUser(userState._id, createdWorkout);
          setSaveState(MESSAGES.WORKOUT_SAVED);
          localStorage.setItem("workoutId", createdWorkout.data._id)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="row">
        <h4>Create Workout</h4>
        <ul className="edit-timer-list">
          <InputList />
        </ul>
      </div>
      <div className="button-div">
        {
          userState.email === null ?
            <label className="flow-text">{MESSAGES.MUST_BE_SIGNED_IN_TO_SAVE}</label>
            :
            <>
              <Link to="/timer">
                <button className="form-button">
                  <i className="fas fa-play flow-text"></i>
                </button>
              </Link>
              <button
                className="form-button modal-trigger"
                data-target="message-modal"
                onClick={() => saveWorkout()}
              >
                <i className="fas fa-save flow-text"></i>
              </button>
            </>
        }
      </div>
      <MessageModal message={saveState} />
    </>
  )
}
