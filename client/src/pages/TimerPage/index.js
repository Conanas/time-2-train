import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import useSound from 'use-sound';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import { startTimerContinuous, onCompleteContinuous } from '../../utils/timer/continuous';
import { startTimerNonContinuous, onCompleteNonContinuous } from '../../utils/timer/nonContinuous';
import './style.css';

import beep321Import from '../../assets/beep321.wav';
import beepGoImport from '../../assets/beepGo.mp3';
import beepBreakImport from '../../assets/beepBreak.wav';
import beepCompletedImport from '../../assets/beepCompleted.wav';

export default function TimerPage() {

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
      this.sound.play();
    }
    this.stop = function () {
      this.sound.pause();
    }
  }

  let beep321 = new sound(beep321Import);
  let beepGo = new sound(beepGoImport);
  let beepBreak = new sound(beepBreakImport);
  let beepCompleted = new sound(beepCompletedImport);

  const BACKGROUND_COLORS = {
    INITIAL: "white",
    PREPARE: "white",
    WORK: "white",
    REST: "red",
    BREAK: "blue",
    COMPLETED: "white"
  }

  const MODES = {
    PREPARE: "Prepare",
    WORK: "Work",
    REST: "Rest",
    BREAK: "Break",
    COMPLETED: "Completed"
  }

  const timerRef = useRef();

  const [workoutState] = useWorkoutContext();

  const initialTimerState = {
    mode: MODES.PREPARE,
    countdown: workoutState.prepare,
    rep: 0,
    set: 0
  }

  const [timerState, setTimerState] = useState(initialTimerState);
  const [playState, setPlayState] = useState(false);
  const [backgroundState, setBackground] = useState(BACKGROUND_COLORS.INITIAL)

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
    document.body.style.backgroundColor = backgroundState;
    return () => document.body.style.backgroundColor = BACKGROUND_COLORS.INITIAL;
  }, [timerState, backgroundState])

  function startTimer() {
    if (!workoutState.continuous) {
      startTimerNonContinuous(timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground);
    } else {
      startTimerContinuous(timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground, timerRef, playState, beepGo, beepBreak, beepCompleted);
    }
    timerRef.current.api.start();
    setPlayState(true)
  }

  function pauseTimer() {
    timerRef.current.api.pause();
    setPlayState(false);
  }

  function onComplete() {
    // playSound();
    // beep.play()
    setPlayState(false)
    if (!workoutState.continuous) {
      onCompleteNonContinuous(timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground);
    } else {
      onCompleteContinuous(timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground, beepGo);
      startTimer();
    }
  }

  function renderer({ minutes, seconds }) {
    if (timerState.mode === MODES.WORK && !workoutState.continuous) {
      return <span id="countdown">Go!</span>
    } else if (timerState.mode === MODES.COMPLETED) {
      return <span id="countdown">Nice!</span>
    } else {
      return <span id="countdown">{zeroPad(minutes)}:{zeroPad(seconds)}</span>
    }
  }

  function onTick() {
    console.log(timerRef.current.state.timeDelta.seconds)
    if ([1, 2, 3].includes(timerRef.current.state.timeDelta.seconds)) {
      beep321.play()
    }
  }

  function resetTimer() {
    setTimerState(initialTimerState);
    setPlayState(false)
  }

  return (
    <>
      <div className="timer-labels-div">
        <label className="flow-text title-label"><span>{workoutState.title}</span></label>
        {
          workoutState.continuous ?
            <label className="flow-text reps-sets-labels">Continuous</label>
            :
            null
        }
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
            onTick={() => onTick()}
          />
        </label>
      </div>
      <div className="timer-button-div">
        {
          timerState.mode === MODES.COMPLETED ?
            <>
              <Link to="/">
                <button className="timer-buttons flow-text">
                  <i className="fas fa-stop"></i>
                </button>
              </Link>
              <button className="timer-buttons flow-text" onClick={() => resetTimer()}>
                <i className="fas fa-redo-alt"></i>
              </button>
            </>
            :
            <>
              <button className="timer-buttons flow-text" onClick={() => playState ? pauseTimer() : startTimer()}>
                <i className={`fas ${playState ? "fa-pause" : "fa-play"}`}></i>
              </button>
              <Link to="/" className="cancel-button">
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
