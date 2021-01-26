import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import './style.css';

export default function TimerPage() {

  const MODES = {
    PREPARE: "Prepare",
    WORK: "Work",
    REST: "Rest",
    BREAK: "Break"
  }

  const timerRef = useRef();

  const [workoutState, dispatchWorkout] = useWorkoutContext();
  const [timerState, setTimerState] = useState({
    rep: 1,
    set: 1,
    mode: MODES.PREPARE,
    countdown: workoutState.prepare
  });

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
  }, [])

  function startTimer() {
    console.log(timerRef)
    if (timerState.mode === MODES.WORK) {
      if (timerState.rep === workoutState.reps) {
        setTimerState({ mode: MODES.BREAK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })
      } else {
        setTimerState({ mode: MODES.REST, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
      }
    }
    if (timerState.mode === MODES.REST) {
      setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep + 1, set: timerState.set })
    }
    timerRef.current.api.start();
  }

  function pauseTimer() {
    timerRef.current.api.pause();
  }

  function onComplete() {
    if (timerState.mode === MODES.PREPARE) {
      setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
    }
    if (timerState.mode === MODES.REST) {
      setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep + 1, set: timerState.set })
    }
    if (timerState.mode === MODES.BREAK) {
      setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: 1, set: timerState.set + 1 })
    }
  }

  function renderer({ minutes, seconds }) {
    return (
      <span id="countdown">{zeroPad(minutes)}:{zeroPad(seconds)}</span>
    )
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
          <Countdown
            ref={timerRef}
            autoStart={false}
            date={Date.now() + timerState.countdown * 1000}
            renderer={renderer}
            onComplete={onComplete}
          />
        </label>
      </div>
      <div className="timer-button-div">
        <button className="timer-buttons flow-text" id="start" onClick={() => startTimer()}>
          <i className="fas fa-play"></i>
        </button>
        <button className="timer-buttons flow-text" id="pause" onClick={() => pauseTimer()}>
          <i className="fas fa-pause"></i>
        </button>
        <Link to="/">
          <button className="timer-buttons flow-text" id="cancel">
            <i className="fas fa-times"></i>
          </button>
        </Link >
      </div >
    </>
  )
}
