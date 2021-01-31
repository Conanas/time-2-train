module.exports = {
  startTimerNonContinuous: (timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground, beepBreak) => {
    if (timerState.mode === MODES.WORK) {
      // after work
      if (timerState.rep === workoutState.reps) {
        // last rep of set go to break
        beepBreak.play();
        setBackground(BACKGROUND_COLORS.BREAK)
        setTimerState({ mode: MODES.BREAK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })
      } else {
        // next rest
        setBackground(BACKGROUND_COLORS.REST)
        setTimerState({ mode: MODES.REST, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
      }
    }
  },

  onCompleteNonContinuous: (timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS, setBackground, beepGo, beepCompleted) => {
    if (timerState.mode === MODES.PREPARE) {
      // after prepare
      if (workoutState.reps === 1 && workoutState.sets === 1) {
        // last rep and set if there's only 1 rep and 1 set
        beepCompleted.play();
        setBackground(BACKGROUND_COLORS.COMPLETED)
        setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep, set: timerState.set })
      } else {
        // first rep after prepare
        beepGo.play();
        setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
      }
    }
    else if (timerState.mode === MODES.REST) {
      // after rest
      if (timerState.rep === workoutState.reps - 1 && timerState.set === workoutState.sets) {
        // last rep and set
        beepCompleted.play()
        setBackground(BACKGROUND_COLORS.COMPLETED)
        setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep + 1, set: timerState.set })
      } else {
        // next rep - work mode
        beepGo.play();
        setBackground(BACKGROUND_COLORS.WORK)
        setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep + 1, set: timerState.set })
      }
    }
    else if (timerState.mode === MODES.BREAK) {
      // after break time
      beepGo.play();
      setBackground(BACKGROUND_COLORS.INITIAL)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: 1, set: timerState.set + 1 })
    }
  }
}
