module.exports = {
  startTimerContinuous: (timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground, timerRef, playState, beepGo, beepBreak) => {
    if (timerState.mode === MODES.PREPARE) {
      // set background color for prepare mode
      // console.log(1)
      setBackground(BACKGROUND_COLORS.PREPARE)
    }
    else if (timerState.mode === MODES.WORK && playState) {
      // in work mode
      if (timerState.rep === workoutState.reps && timerState.set === workoutState.sets) {
        // if on last rep of last set then finish
        // console.log(2)
        setBackground(BACKGROUND_COLORS.COMPLETED)
        setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep, set: timerState.set })
        timerRef.current.api.stop();
      }
      else if (timerState.rep === workoutState.reps) {
        // if on last rep of set go to break

        // console.log(3)
        beepBreak.play();
        setBackground(BACKGROUND_COLORS.BREAK)
        setTimerState({ mode: MODES.BREAK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })
      }
      // else if (timerState.rep === 1 && timerState.set === 1) {
      //   console.log("Here")
      //   setBackground(BACKGROUND_COLORS.WORK)
      // }
      // else {
      //   setBackground(BACKGROUND_COLORS.WORK)
      //   setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep, set: timerState.set })
      // }
      else {
        // go to rest mode
        // console.log(4)
        beepGo.play();
        setBackground(BACKGROUND_COLORS.REST)
        setTimerState({ mode: MODES.REST, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
      }
    }
    else if (timerState.mode === MODES.REST && playState) {
      // if in rest mode go to work mode
      // console.log(5)
      beepGo.play();
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })
    }
  },

  onCompleteContinuous: (timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground, beepGo) => {
    if (timerState.mode === MODES.PREPARE) {
      // go to work mode after prepare - first rep
      // console.log(6)
      beepGo.play();
      setBackground(BACKGROUND_COLORS.WORK)
      document.body.style.backgroundColor = BACKGROUND_COLORS.WORK;
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set + 1 })
    }
    // else if (timerState.mode) {

    // }

    // if (timerState.mode === MODES.REST) {
    //   if (timerState.rep === workoutState.reps - 1 && timerState.set === workoutState.sets) {
    //     document.body.style.backgroundColor = BACKGROUND_COLORS.COMPLETED;
    //     setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep + 1, set: timerState.set })
    //   } else {
    //     document.body.style.backgroundColor = BACKGROUND_COLORS.WORK;
    //     setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })
    //   }
    // }

    else if (timerState.mode === MODES.BREAK) {
      // go to work mode after break
      // console.log(7)
      beepGo.play();
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: 1, set: timerState.set + 1 })
    }
  }
}
