import React, { useEffect } from 'react';
import API from '../../utils/API';
import { SET_ACTIONS } from '../../utils/actions';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import './style.css';

export default function TimerPage() {
  const [workoutState, dispatchWorkout] = useWorkoutContext();

  useEffect(() => {
    let workoutId = localStorage.workoutId
    API.getWorkout(workoutId)
      .then(res => {
        if (res.data) {
          dispatchWorkout({ type: SET_ACTIONS.workout, payload: res.data });
        }
      }).catch(err => console.log(err))
  }, [])

  return (
    <>
      <div className="timer-labels-div">
        <label className="flow-text title-label"><span>{workoutState.title}</span></label>
        <label className="flow-text reps-sets-labels">
          Reps Left: <span id="reps-left">{workoutState.reps}</span>
        </label>
        <label className="flow-text reps-sets-labels">
          Sets Left: <span id="sets-left">{workoutState.sets}</span>
        </label>
        <label className="flow-text">
          <span id="stage">Prepare</span>
        </label>
        <label className="flow-text">
          <span id="countdown">{workoutState.prepare}</span>
        </label>
      </div>
      <div className="timer-button-div">
        <button className="flow-text" id="start">
          <i class="fas fa-play"></i>
        </button>
        <button className="flow-text" id="pause">
          <i class="fas fa-pause"></i>
        </button>
        <button className="flow-text" id="cancel">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </>
  )
}
