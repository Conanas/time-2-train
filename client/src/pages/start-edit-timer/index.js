import React, { useState } from 'react';
import './style.css';

export default function StartEditTimer() {
  const [workout, setWorkout] = useState(
    {
      continuous: true,
      prepare: 8,
      reps: 3,
      work: 30,
      rest: 15,
      sets: 4,
      break: 180
    }
  )

  function findMinutes(totalSeconds) {
    return Math.floor(totalSeconds / 60);
  }

  function findSeconds(totalSeconds) {
    let secs = totalSeconds % 60
    if (secs <= 10) {
      return `0${secs}`;
    }
    return secs;
  }

  return (
    <>
      <h1 className="flow-text">Start/Edit Workout</h1>
      <form className="edit-timer-form">
        <ul className="edit-timer-list">

          {/* Continuous */}
          <li className="edit-timer-list-item">
            <label className="flow-text">Continuous</label>
            <i class="fas fa-toggle-on flow-text"></i>
            <i class="fas fa-toggle-off flow-text"></i>
          </li>

          {/* Prepare */}
          <li className="edit-timer-list-item">
            <label className="flow-text">Prepare</label>
            <i class="far fa-minus-square flow-text"></i>
            <div className="workout-units flow-text">
              <span>{findMinutes(workout.prepare)}</span>:<span>{findSeconds(workout.prepare)}</span>
            </div>
            <i class="far fa-plus-square flow-text"></i>
          </li>

          {/* Reps */}
          <li className="edit-timer-list-item">
            <label className="flow-text">Reps</label>
            <i class="far fa-minus-square flow-text"></i>
            <div className="workout-units flow-text">
              <span>{workout.reps}</span>
            </div>
            <i class="far fa-plus-square flow-text"></i>
          </li>

          {/* Work */}
          <li className="edit-timer-list-item">
            <label className="flow-text">Work</label>
            <i class="far fa-minus-square flow-text"></i>
            <div className="workout-units flow-text">
              <span>{findMinutes(workout.work)}</span>:<span>{findSeconds(workout.work)}</span>
            </div>
            <i class="far fa-plus-square flow-text"></i>
          </li>

          {/* Rest */}
          <li className="edit-timer-list-item">
            <label className="flow-text">Rest</label>
            <i class="far fa-minus-square flow-text"></i>
            <div className="workout-units flow-text">
              <span>{findMinutes(workout.rest)}</span>:<span>{findSeconds(workout.rest)}</span>
            </div>
            <i class="far fa-plus-square flow-text"></i>
          </li>

          {/* Sets */}
          <li className="edit-timer-list-item">
            <label className="flow-text">Sets</label>
            <i class="far fa-minus-square flow-text"></i>
            <div className="workout-units flow-text">
              <span>{workout.sets}</span>
            </div>
            <i class="far fa-plus-square flow-text"></i>
          </li>

          {/* Break */}
          <li className="edit-timer-list-item">
            <label className="flow-text">Break</label>
            <i class="far fa-minus-square flow-text"></i>
            <div className="workout-units flow-text">
              <span>{findMinutes(workout.break)}</span>:<span>{findSeconds(workout.break)}</span>
            </div>
            <i class="far fa-plus-square flow-text"></i>
          </li>

        </ul>
        <input className="form-button" type="button" value="Start"></input>
        <input className="form-button" type="button" value="Save"></input>
        <input className="form-button" type="button" value="Load"></input>
      </form>
    </>
  )
}