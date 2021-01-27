import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import useSound from 'use-sound';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import './style.css';

import beep2 from '../../assets/beep-1.wav';

export default function TimerPage() {

  const [play] = useSound(beep2);

  const BACKGROUND_COLORS = {
    INITIAL: "white",
    PREPARE: "yellow",
    WORK: "green",
    REST: "red",
    BREAK: "blue",
    COMPLETED: "white"
  }

  let backgroundColor = BACKGROUND_COLORS.INITIAL;

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
    return () => document.body.style.backgroundColor = BACKGROUND_COLORS.INITIAL;
  }, [])

  function startTimer() {
    if (workoutState.continuous === false) {

      if (timerState.mode === MODES.PREPARE) {
        backgroundColor = BACKGROUND_COLORS.PREPARE;
        document.body.style.backgroundColor = backgroundColor;
      }

      if (timerState.mode === MODES.WORK) {
        if (timerState.rep === workoutState.reps) {
          backgroundColor = BACKGROUND_COLORS.BREAK;
          document.body.style.backgroundColor = backgroundColor;
          setTimerState({ mode: MODES.BREAK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })
        } else {
          backgroundColor = BACKGROUND_COLORS.REST;
          document.body.style.backgroundColor = backgroundColor;
          setTimerState({ mode: MODES.REST, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
        }
      }

      if (timerState.mode === MODES.REST) {
        backgroundColor = BACKGROUND_COLORS.WORK;
        document.body.style.backgroundColor = backgroundColor;
        setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep + 1, set: timerState.set })
      }

    } else {

      if (timerState.mode === MODES.WORK) {
        if (timerState.rep === workoutState.reps) {
          setTimerState({ mode: MODES.BREAK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })
        } else {
          setTimerState({ mode: MODES.REST, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
        }
      }

      if (timerState.mode === MODES.REST) {
        setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })
      }

    }
    timerRef.current.api.start();
    setPlayState(true)
  }

  function pauseTimer() {
    timerRef.current.api.pause();
  }

  function onComplete() {
    play();
    setPlayState(false)
    if (workoutState.continuous === false) {

      if (timerState.mode === MODES.PREPARE) {
        if (workoutState.reps === 1 && workoutState.sets === 1) {
          backgroundColor = BACKGROUND_COLORS.COMPLETED;
          document.body.style.backgroundColor = backgroundColor;
          setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep, set: timerState.set })
        } else {
          backgroundColor = BACKGROUND_COLORS.WORK;
          document.body.style.backgroundColor = backgroundColor;
          setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
        }
      }

      if (timerState.mode === MODES.REST) {
        if (timerState.rep === workoutState.reps - 1 && timerState.set === workoutState.sets) {
          backgroundColor = BACKGROUND_COLORS.COMPLETED;
          document.body.style.backgroundColor = backgroundColor;
          setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep + 1, set: timerState.set })
        } else {
          backgroundColor = BACKGROUND_COLORS.WORK;
          document.body.style.backgroundColor = backgroundColor;
          setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep + 1, set: timerState.set })
        }
      }

      if (timerState.mode === MODES.BREAK) {
        backgroundColor = BACKGROUND_COLORS.WORK;
        document.body.style.backgroundColor = backgroundColor;
        setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: 1, set: timerState.set + 1 })
      }

    } else {

      if (timerState.mode === MODES.PREPARE) {
        setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep, set: timerState.set })
      }

      if (timerState.mode === MODES.REST) {
        if (timerState.rep === workoutState.reps - 1 && timerState.set === workoutState.sets) {
          setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep + 1, set: timerState.set })
        } else {
          setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })
        }
      }

      if (timerState.mode === MODES.BREAK) {
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
                <i className="fas fa-stop"></i>
              </button>
            </Link>
            <button className="timer-buttons flow-text" onClick={() => setTimerState(initialState)}>
              <i className="fas fa-redo-alt"></i>
            </button>
          </>
          :
          <>
            {
              playState === true ?
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
