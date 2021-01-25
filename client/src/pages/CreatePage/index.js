import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import InputList from '../../components/InputList/';
import MessageModal from '../../components/Modals/MessageModal/';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/WorkoutContext";
import { useEditContext } from '../../utils/EditContext';
import { useUserContext } from '../../utils/UserContext';
import { SET_ACTIONS, EDIT, START, MESSAGES } from '../../utils/actions';
import './style.css';

export default function CreatePage() {
  const [saveState, setSaveState] = useState();
  const [editState, dispatchEditState] = useEditContext();
  const [workoutState, dispatchWorkout] = useWorkoutContext();
  const [userState, dispatchUser] = useUserContext();

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
    dispatchEditState({ type: EDIT })
  }, [])

  async function saveWorkout() {
    try {
      let existingWorkout = await API.getWorkoutByTitle(workoutState.title, userState._id);
      if (existingWorkout.data != null) {
        console.log("Save Exists")
        setSaveState(MESSAGES.WORKOUT_EXISTS);
      } else {
        let createdWorkout = await API.postWorkout(userState._id, workoutState);
        await API.putUser(userState._id, createdWorkout);
        setSaveState(MESSAGES.WORKOUT_SAVED);
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
        {userState.email === null ?
          <label className="flow-text">{MESSAGES.MUST_BE_SIGNED_IN_TO_SAVE}</label>
          :
          <button
            className="form-button modal-trigger"
            data-target="message-modal"
            onClick={(() => saveWorkout())}
          >
            <i className="fas fa-save flow-text"></i>
          </button>
        }
      </div>
      <MessageModal message={saveState} />
    </>
  )
}
