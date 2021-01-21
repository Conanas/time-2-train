import React, { useEffect } from 'react';
import InputList from '../../components/InputList/';
import SaveModal from '../../components/SaveModal/';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/WorkoutContext";
import { useEditContext } from '../../utils/EditContext';
import { useUserContext } from '../../utils/UserContext';
import { SET_ACTIONS, EDIT, START } from '../../utils/actions';
import './style.css';

export default function StartEditTimer(props) {
  const [editState, dispatchEditState] = useEditContext();
  const [workoutState, dispatchWorkout] = useWorkoutContext();
  const [userState, dispatchUser] = useUserContext();

  useEffect(() => {
    dispatchEditState({ type: EDIT })
  }, [])

  async function saveWorkout() {
    try {
      // let existingWorkout = await API.getWorkoutByName(workoutState);
      let createdWorkout = await API.postWorkout(workoutState);
      await API.putUser(userState._id, createdWorkout);
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
          <label className="flow-text">You must be signed in to save a new workout</label>
          :
          <button
            className="form-button modal-trigger"
            data-target="save-modal"
            onClick={(() => saveWorkout())}
          >
            <i className="fas fa-save flow-text"></i>
          </button>
        }
      </div>
      <SaveModal />
    </>
  )
}
