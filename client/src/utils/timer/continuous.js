const { BACKGROUND_COLORS } = require('./backgroundColors');
const { MODES } = require('./modes');
const {
  BEEP_GO,
  BEEP_BREAK,
  BEEP_COMPLETED } = require('./sounds/');

module.exports = {
  startTimerContinuous: (timerState, setTimerState, workoutState, setBackground, timerRef, playState) => {
    if (timerState.mode === MODES.WORK && playState) {
      // in work mode
      if (timerState.rep === workoutState.reps && timerState.set === workoutState.sets) {
        // if on last rep of last set then finish
        BEEP_COMPLETED.play();
        setBackground(BACKGROUND_COLORS.COMPLETED)
        setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep, set: timerState.set })
        timerRef.current.api.stop();
      }
      else if (timerState.rep === workoutState.reps) {
        // if on last rep of set go to break
        BEEP_BREAK.play();
        setBackground(BACKGROUND_COLORS.BREAK)
        setTimerState({ mode: MODES.BREAK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })
      }
      else {
        // go to rest mode
        BEEP_GO.play();
        setBackground(BACKGROUND_COLORS.REST)
        setTimerState({ mode: MODES.REST, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
      }
    }
    else if (timerState.mode === MODES.REST && playState) {
      // if in rest mode go to work mode
      BEEP_GO.play();
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep + 1, set: timerState.set })
    }
  },

  onCompleteContinuous: (timerState, setTimerState, workoutState, setBackground) => {
    if (timerState.mode === MODES.PREPARE) {
      // go to work mode after prepare - first rep
      BEEP_GO.play();
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: timerState.rep, set: timerState.set })
    }
    else if (timerState.mode === MODES.BREAK) {
      // go to work mode after break
      BEEP_GO.play();
      setBackground(BACKGROUND_COLORS.WORK)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.work, rep: 1, set: timerState.set + 1 })
    }
  }
}
