module.exports = {
  startTimerContinuous: (timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground, timerRef, playState, beepGo, beepBreak, beepCompleted) => {
    if (timerState.mode === MODES.WORK && playState) {
      // in work mode
      if (timerState.rep === workoutState.reps && timerState.set === workoutState.sets) {
        // if on last rep of last set then finish
        beepCompleted.play();
        setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep, set: timerState.set })
        timerRef.current.api.stop();
      }
      else if (timerState.rep === workoutState.reps) {
        // if on last rep of set go to break
        beepBreak.play();
        setBackground(BACKGROUND_COLORS.BREAK)
        setTimerState({ mode: MODES.BREAK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })
      }
      else {
        // go to rest mode
        beepGo.play();
        setTimerState({ mode: MODES.REST, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
      }
    }
    else if (timerState.mode === MODES.REST && playState) {
      // if in rest mode go to work mode
      beepGo.play();
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })
    }
  },

  onCompleteContinuous: (timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground, beepGo) => {
    if (timerState.mode === MODES.PREPARE) {
      // go to work mode after prepare - first rep
      beepGo.play();
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep, set: timerState.set })
    }
    else if (timerState.mode === MODES.BREAK) {
      // go to work mode after break
      beepGo.play();
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: 1, set: timerState.set + 1 })
    }
  }
}
