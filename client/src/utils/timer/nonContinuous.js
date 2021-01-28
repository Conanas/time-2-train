module.exports = {
  startTimerNonContinuous: (timerState, setTimerState, workoutState, MODES, backgroundColor, BACKGROUND_COLORS) => {
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
  },

  onCompleteNonContinuous: (timerState, setTimerState, workoutState, MODES, backgroundColor, BACKGROUND_COLORS) => {
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
  }
}