import React from 'react';
import { useWorkoutContext } from '../../utils/GlobalState';
import './style.css';

export default function LoadModal() {
  const [workoutState, workoutDispatch] = useWorkoutContext();

  return (
    <div id="load-modal" className="modal">
      <div className="modal-content">
        <h4>{workoutState.title}</h4>
        <ul>
          {Object.keys(workoutState).map((key, index) => {
            return (
              <li key={index}>
                {key !== "id" ?
                  key !== "title" ?
                    `${key.charAt(0).toUpperCase() + key.slice(1)}: ${workoutState[key]}`
                    : null
                  : null}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="modal-footer">
        <a href={`/workout/${workoutState.id}`}><button className="modal-close waves-effect waves-green btn-flat">Load</button></a>
      </div>
    </div>
  )
}