import React, { useEffect } from 'react';
import InputList from '../../components/InputList/';
import UpdateModal from '../../components/UpdateModal/';
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
    dispatchEditState({ type: START })
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

  return (
    <>
      <div className="row">
        <h4>{editState === START ? "Start" : "Edit"} Workout</h4>
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
      <UpdateModal />
    </>
  )
}