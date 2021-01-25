import React from 'react';
import { MESSAGES, BUTTONS } from '../../../utils/actions';

export default function DeleteModal({ getWorkouts, deleteWorkout, workoutId }) {
  return (
    <>
      <div id="delete-modal" className="modal">
        <div className="modal-content">
          <h4 className="flow-text">{MESSAGES.ARE_YOU_SURE}</h4>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat">{BUTTONS.CANCEL}</button>
          <button className="modal-close waves-effect waves-green btn-flat"
            onClick={() => {
              deleteWorkout(workoutId)
              localStorage.setItem("workoutId", null)
              getWorkouts();
            }}
          >
            {BUTTONS.CONFIRM}
          </button>
        </div>
      </div>
    </>
  )
}