import React from 'react';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import { useEditContext } from '../../utils/EditContext';
import { START } from '../../utils/actions';
import API from '../../utils/API';

export default function SaveModal() {
  const [workoutState] = useWorkoutContext();
  const [editState, editDispatch] = useEditContext();

  function updateWorkout() {
    editDispatch({ type: START })
    API.putWorkout(workoutState)
      .then(res => res.json)
      .catch(err => console.log(err));
  }

  return (
    <div id="save-message-modal" className="modal">
      <div className="modal-content">
        <h4 className="flow-text">Are you sure?</h4>
        <label>This will overwrite the current workout</label>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">Cancel</button>
        <button className="modal-close waves-effect waves-green btn-flat" onClick={() => updateWorkout()}>Confirm</button>
      </div>
    </div >
  )
}