import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import InputList from '../../components/InputList/';
import MessageModal from '../../components/Modals/MessageModal/';
import { useWorkoutContext } from "../../utils/contexts/WorkoutContext";
import { useEditContext } from '../../utils/contexts/EditContext';
import { SET_ACTIONS } from '../../utils/contexts/actions';
import { EDIT } from '../../utils/contexts/edit-state-strings';

export default function CreatePage() {
  const [saveState,] = useState();
  const [, dispatchEditState] = useEditContext();
  const [, dispatchWorkout] = useWorkoutContext();

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
    dispatchEditState({ type: EDIT })
    dispatchWorkout({ type: SET_ACTIONS.reset })
  }, [])

  return (
    <>
      <div className="row">
        {/* TODO: increase gap under page title */}
        <h4>Create Workout</h4>
        <ul className="edit-timer-list">
          <InputList />
        </ul>
      </div>
      <div className="button-div">
        <Link to="/timer">
          <button className="form-button">
            <i className="fas fa-play flow-text"></i>
          </button>
        </Link>
      </div>
      <MessageModal message={saveState} />
    </>
  )
}
