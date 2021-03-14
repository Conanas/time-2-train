import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import M from 'materialize-css/dist/js/materialize.min.js';
import TobyModal from '../../components/Modals/TobyModal';
import { useWorkoutContext } from '../../utils/contexts/WorkoutContext';
import { useUserContext } from '../../utils/contexts/UserContext';
import { startTimerContinuous, onCompleteContinuous } from '../../utils/timer/continuous';
import { startTimerNonContinuous, onCompleteNonContinuous } from '../../utils/timer/nonContinuous';
import { BEEP_321 } from '../../utils/timer/sounds/';
import { BACKGROUND_COLORS } from '../../utils/timer/backgroundColors';
import { MODES } from '../../utils/timer/modes';
import './style.css';

import API from '../../utils/API';
import { SET_ACTIONS } from '../../utils/contexts/actions';

export default function TimerPage() {

  const timerRef = useRef();

  const [workoutState, dispatchWorkout] = useWorkoutContext();
  const [userState] = useUserContext();

  let initialTimerState = {}

  if (workoutState.continuous) {
    initialTimerState = {
      mode: MODES.PREPARE,
      countdown: workoutState.prepare,
      rep: 1,
      set: 1
    }
  } else {
    initialTimerState = {
      mode: MODES.WORK,
      countdown: workoutState.rest,
      rep: 1,
      set: 1
    }
  }

  const [timerState, setTimerState] = useState(initialTimerState);
  const [playState, setPlayState] = useState(false);
  const [backgroundState, setBackground] = useState(BACKGROUND_COLORS.INITIAL)

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
    document.getElementsByClassName("wrapper")[0].style.backgroundColor = backgroundState;
    if (workoutState._id === null && userState.email) {
      API.getWorkout(localStorage.getItem('workoutId'))
        .then(res => dispatchWorkout({ type: SET_ACTIONS.workout, payload: res.data }))
        .catch(err => console.log(err))
    }
    return () => document.getElementsByClassName("wrapper")[0].style.backgroundColor = BACKGROUND_COLORS.DEFAULT;
  }, [timerState, backgroundState, workoutState, userState])

  function startTimer() {
    console.log('starting timer', timerState)
    if (!workoutState.continuous) {
      startTimerNonContinuous(timerState, setTimerState, workoutState, setBackground);
    } else {
      startTimerContinuous(timerState, setTimerState, workoutState, setBackground, timerRef, playState);
    }
    // if ([1, 2, 3].includes(timerRef.current.state.timeDelta.seconds) && timerRef.current.state.timeDelta.minutes === 0) {
    //   BEEP_321.play();
    // }
    timerRef.current.api.start();
    setPlayState(true);
    console.log('timer started', timerState)
  }

  function pauseTimer() {
    timerRef.current.api.pause();
    setPlayState(false);
  }

  function onComplete() {
    console.log('finishing timer', timerState)
    setPlayState(false);
    if (!workoutState.continuous) {
      onCompleteNonContinuous(timerState, setTimerState, workoutState, setBackground);
    } else {
      onCompleteContinuous(timerState, setTimerState, workoutState, setBackground);
      startTimer();
    }
    console.log('timer completed', timerState)
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
    if ([1, 2, 3].includes(timerRef.current.state.timeDelta.seconds) && timerRef.current.state.timeDelta.minutes === 0) {
      BEEP_321.play()
    }
  }

  function resetTimer() {
    setTimerState(initialTimerState);
    setPlayState(false)
  }

  function changeRep(x) {
    // If timer playing then pause timer
    if (playState === true) {
      pauseTimer();
    }

    console.log(timerState)
    console.log(workoutState)
    // If Non-Continuous
    if (!workoutState.continuous) {
      // If moving forwards
      if (x === 1) {
        // Reps can't go more then rep limit
        // If on last rep of last set then go to finish
        if (timerState.rep === workoutState.reps && timerState.set === workoutState.sets) {

          // If on last rep then go to break mode
        } else if (timerState.rep === workoutState.reps) {
          setBackground(BACKGROUND_COLORS.BREAK)
          setTimerState({ mode: MODES.WORK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })

          // If in work mode then go to next work mode
        } else if (timerState.mode === MODES.WORK) {
          setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })

          // If in rest mode then go to next work mode
        } else if (timerState.mode === MODES.REST) {

          // If in break mode then go to next work mode and set
        } else if (timerState.mode === MODES.BREAK) {

        }
      } else {
        // If moving backwards

        // Reps can't go less then 1

        // If in work mode then go to previous work mode

        // If in rest mode then go to previous work mode

        // If in break mode then go to next work mode and set

      }
    } else {

    }
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
              {/* <button className="timer-buttons flow-text"><i className="fas fa-fast-backward"></i></button>
              <button className="timer-buttons flow-text" onClick={() => changeRep(-1)}><i className="fas fa-step-backward"></i></button> */}
              <button className="timer-buttons flow-text play-pause-button" onClick={() => playState ? pauseTimer() : startTimer()}>
                <i className={`fas ${playState ? "fa-pause" : "fa-play"}`}></i>
              </button>
              {/* <button className="timer-buttons flow-text" onClick={() => changeRep(1)}><i className="fas fa-step-forward"></i></button>
              <button className="timer-buttons flow-text"><i className="fas fa-fast-forward"></i></button> */}
            </>
        }
      </div >
      <TobyModal timerState={timerState} />
    </>
  )
}
