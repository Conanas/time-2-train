import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import API from '../../utils/API';
import { SET_ACTIONS } from '../../utils/actions';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import './style.css';

export default function TimerPage() {

  const MODES = {
    PREPARE: "Prepare",
    WORK: "Work",
    REST: "Rest",
    BREAK: "Break"
  }

  const [workoutState, dispatchWorkout] = useWorkoutContext();
  const [timerState, setTimerState] = useState({
    ...workoutState,
    rep: 1,
    set: 1,
    mode: MODES.PREPARE
  });

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
    console.log(timerState)
  }, [timerState])

  function startTimer() {
    let timer = setInterval(playTimer, 1000)
    function playTimer() {
      if (timerState.mode = MODES.PREPARE) {
        setTimerState(prevState => timerState.prepare = prevState.prepare - 1)
        console.log(timerState)
      }
    }
  }

  return (
    <>
      <div className="timer-labels-div">
        <label className="flow-text title-label"><span>{workoutState.title}</span></label>
        <label className="flow-text reps-sets-labels">
          Rep: <span id="reps-left">{timerState.rep}/{workoutState.reps}</span>
        </label>
        <label className="flow-text reps-sets-labels">
          Set: <span id="sets-left">{timerState.set}/{workoutState.sets}</span>
        </label>
        <label className="flow-text">
          <span id="stage">{timerState.mode}</span>
        </label>
        <label className="flow-text">
          <span id="countdown">{timerState.prepare}</span>
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
