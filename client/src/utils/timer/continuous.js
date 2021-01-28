module.exports = {
  startTimerContinuous: (timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground, timerRef) => {
    if (timerState.mode === MODES.PREPARE) {
      // set background color for prepare mode
      setBackground(BACKGROUND_COLORS.PREPARE)
    }
    else if (timerState.mode === MODES.WORK) {
      // in work mode
      if (timerState.rep === workoutState.reps && timerState.set === workoutState.sets) {
        // if on last rep of last set then finish
        setBackground(BACKGROUND_COLORS.COMPLETED)
        setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep, set: timerState.set })
        timerRef.current.api.stop();
      }
      else if (timerState.rep === workoutState.reps) {
        // if on last rep of set go to break
        setBackground(BACKGROUND_COLORS.BREAK)
        setTimerState({ mode: MODES.BREAK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })
      } else {
        // go to rest mode
        setBackground(BACKGROUND_COLORS.REST)
        setTimerState({ mode: MODES.REST, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
      }
    }
    else if (timerState.mode === MODES.REST) {
      // if in rest mode go to work mode
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })
    }
  },

  onCompleteContinuous: (timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground) => {
    if (timerState.mode === MODES.PREPARE) {
      // go to work mode after prepare - first rep
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep, set: timerState.set })
    }
    else if (timerState.mode === MODES.BREAK) {
      // go to work mode after break
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: 1, set: timerState.set + 1 })
    }
  }
}
