import React from 'react';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import { SET_ACTIONS } from '../../utils/actions';
import API from '../../utils/API';

export default function SaveModal() {
  const [workoutState, dispatchWorkout] = useWorkoutContext();

  function updateWorkout() {
    console.log(workoutState)
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