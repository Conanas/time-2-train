module.exports = {
  startTimerContinuous: (timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground) => {
    if (timerState.mode === MODES.PREPARE) {
      setBackground(BACKGROUND_COLORS.PREPARE)
    }
    else if (timerState.mode === MODES.WORK) {
      if (timerState.rep === workoutState.reps) {
        setBackground(BACKGROUND_COLORS.BREAK)
        setTimerState({ mode: MODES.BREAK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })
      } else {
        setBackground(BACKGROUND_COLORS.REST)
        setTimerState({ mode: MODES.REST, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
      }
    }
    else if (timerState.mode === MODES.REST) {
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })
    }
  },

  onCompleteContinuous: (timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground) => {
    if (timerState.mode === MODES.PREPARE) {
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep, set: timerState.set })
    }
    else if (timerState.mode === MODES.REST) {
      if (timerState.rep === workoutState.reps - 1 && timerState.set === workoutState.sets) {
        setBackground(BACKGROUND_COLORS.COMPLETED)
        setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep + 1, set: timerState.set })
      } else {
        setBackground(BACKGROUND_COLORS.WORK)
        setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })
      }
    }
    else if (timerState.mode === MODES.BREAK) {
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: 1, set: timerState.set + 1 })
    }
  }
}
