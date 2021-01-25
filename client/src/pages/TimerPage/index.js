import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import { SET_ACTIONS } from '../../utils/actions';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import './style.css';

export default function TimerPage() {
  const [workoutState, dispatchWorkout] = useWorkoutContext();
  const [localWorkout, setLocalWorkout] = useState();

  useEffect(() => {
    setLocalWorkout(workoutState)
    console.log(localWorkout)
  }, [localWorkout])

  function startTimer() {
    let timer = setInterval(playTimer, 1000)
    function playTimer() {

    }
  }

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
        <button className="flow-text" id="start" onClick={() => startTimer()}>
          <i className="fas fa-play"></i>
        </button>
        <button className="flow-text" id="pause">
          <i className="fas fa-pause"></i>
        </button>
        <Link to="/">
          <button className="flow-text" id="cancel">
            <i className="fas fa-times"></i>
          </button>
        </Link >
      </div >
    </>
  )
}
