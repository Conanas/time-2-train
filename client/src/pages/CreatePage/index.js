import React, { useEffect } from 'react';
import InputList from '../../components/InputList/';
import SaveMessageModal from '../../components/SaveMessageModal';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/WorkoutContext";
import { useEditContext } from '../../utils/EditContext';
import { userUserContext, useUserContext } from '../../utils/UserContext';
import { SET_ACTIONS, EDIT, START } from '../../utils/actions';
import './style.css';

export default function StartEditTimer(props) {
  const [editState, dispatchEditState] = useEditContext();
  const [workoutState, dispatch] = useWorkoutContext();
  const [userState, dispatchUser] = useUserContext();

  return (
    <>
      <div className="row">
        <h4>Create Workout</h4>
        <ul className="edit-timer-list">
          <InputList />
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