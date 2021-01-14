import React from 'react';
import { useWorkoutContext } from '../../utils/GlobalState';
import './style.css';

export default function LoadModal() {
  const [workoutState, workoutDispatch] = useWorkoutContext();

  return (
    <div id="load-modal" className="modal">
      <div className="modal-content">
        <h4>{workoutState.title}</h4>
        <label>Workout Details</label>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">Load</button>
      </div>
    </div>
  )
}