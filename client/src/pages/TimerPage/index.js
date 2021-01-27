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
    BREAK: "Break",
    COMPLETED: "Completed"
  }

  const timerRef = useRef();

  const [workoutState] = useWorkoutContext();

  const initialState = {
    rep: 1,
    set: 1,
    mode: MODES.PREPARE,
    countdown: workoutState.prepare
  }

  const [timerState, setTimerState] = useState(initialState);
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
  }, [])

  function startTimer() {
    console.log("onStart: ", timerState)
    if (workoutState.continuous === false) {

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

    } else {

      if (timerState.mode === MODES.WORK) {
        if (timerState.rep === workoutState.reps) {
          console.log("mode: ", timerState.mode)
          setTimerState({ mode: MODES.BREAK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })
        } else {
          console.log("mode: ", timerState.mode)
          setTimerState({ mode: MODES.REST, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
        }
      }

      if (timerState.mode === MODES.REST) {
        console.log("mode: ", timerState.mode)
        setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })
      }

    }
    timerRef.current.api.start();
    setPlayState(true)
    console.log("Started")
  }

  function pauseTimer() {
    timerRef.current.api.pause();
  }

  function onComplete() {
    console.log("onComplete: ", timerState)
    setPlayState(false)
    if (workoutState.continuous === false) {

      if (timerState.mode === MODES.PREPARE) {
        if (workoutState.reps === 1 && workoutState.sets === 1) {
          setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep, set: timerState.set })
        } else {
          setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
        }
      }

      if (timerState.mode === MODES.REST) {
        if (timerState.rep === workoutState.reps - 1 && timerState.set === workoutState.sets) {
          setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep + 1, set: timerState.set })
        } else {
          setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep + 1, set: timerState.set })
        }
      }

      if (timerState.mode === MODES.BREAK) {
        setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: 1, set: timerState.set + 1 })
      }

    } else {

      if (timerState.mode === MODES.PREPARE) {
        console.log("mode: ", timerState.mode)
        setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep, set: timerState.set })
      }

      if (timerState.mode === MODES.REST) {
        if (timerState.rep === workoutState.reps - 1 && timerState.set === workoutState.sets) {
          console.log("mode: ", timerState.mode)
          setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep + 1, set: timerState.set })
        } else {
          console.log("mode: ", timerState.mode)
          setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })
        }
      }

      if (timerState.mode === MODES.BREAK) {
        console.log("mode: ", timerState.mode)
        setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: 1, set: timerState.set + 1 })
      }
      startTimer();

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
        {workoutState.continuous ?
          <label className="flow-text reps-sets-labels">Continuous</label>
          : null}
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
            onComplete={() => onComplete()}
          />
        </label>
      </div>
      <div className="timer-button-div">
        {timerState.mode === MODES.COMPLETED ?
          <>
            <Link to="/">
              <button className="timer-buttons flow-text">
                <i class="fas fa-stop"></i>
              </button>
            </Link>
            <button className="timer-buttons flow-text" onClick={() => setTimerState(initialState)}>
              <i class="fas fa-redo-alt"></i>
            </button>
          </>
          :
          <>
            {playState === true ?
              <button className="timer-buttons flow-text" id="pause" onClick={() => pauseTimer()}>
                <i className="fas fa-pause"></i>
              </button>
              :
              <button className="timer-buttons flow-text" id="start" onClick={() => startTimer()}>
                <i className="fas fa-play"></i>
              </button>
            }
            <Link to="/">
              <button className="timer-buttons flow-text" id="cancel">
                <i className="fas fa-times"></i>
              </button>
            </Link >
          </>
        }
      </div >
    </>
  )
}
