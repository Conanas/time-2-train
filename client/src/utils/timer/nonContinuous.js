const { BACKGROUND_COLORS } = require('./backgroundColors');
const { MODES } = require('./modes');
const {
  BEEP_GO,
  BEEP_BREAK,
  BEEP_COMPLETED
} = require('./sounds/');

module.exports = {
  startTimerNonContinuous: (timerState, setTimerState, workoutState, setBackground) => {
    if (timerState.mode === MODES.WORK) {
      // after work
      if (timerState.rep === workoutState.reps) {
        // last rep of set go to break
        BEEP_BREAK.play();
        setBackground(BACKGROUND_COLORS.BREAK)
        setTimerState({ mode: MODES.BREAK, countdown: workoutState.break, rep: timerState.rep, set: timerState.set })
      } else {
        // next rest
        setBackground(BACKGROUND_COLORS.REST)
        setTimerState({ mode: MODES.REST, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
      }
    }
  },

  onCompleteNonContinuous: (timerState, setTimerState, workoutState, setBackground) => {
    if (timerState.mode === MODES.PREPARE) {
      // after prepare
      if (workoutState.reps === 1 && workoutState.sets === 1) {
        // last rep and set if there's only 1 rep and 1 set
        BEEP_COMPLETED.play();
        setBackground(BACKGROUND_COLORS.COMPLETED)
        setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep, set: timerState.set })
      } else {
        // first rep after prepare
        BEEP_GO.play();
        setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep, set: timerState.set })
      }
    }
    else if (timerState.mode === MODES.REST) {
      // after rest
      if (timerState.rep === workoutState.reps - 1 && timerState.set === workoutState.sets) {

        // TODO: turn on last rep so when user clicks next button it goes to toby image

        // last rep and set
        BEEP_COMPLETED.play()
        setBackground(BACKGROUND_COLORS.COMPLETED)
        setTimerState({ mode: MODES.COMPLETED, countdown: 0, rep: timerState.rep + 1, set: timerState.set })
      } else {
        // next rep - work mode
        BEEP_GO.play();
        setBackground(BACKGROUND_COLORS.WORK)
        setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: timerState.rep + 1, set: timerState.set })
      }
    }
    else if (timerState.mode === MODES.BREAK) {
      // after break time
      BEEP_GO.play();
      setBackground(BACKGROUND_COLORS.DEFAULT)
      setTimerState({ mode: MODES.WORK, countdown: workoutState.rest, rep: 1, set: timerState.set + 1 })
    }
  }
}
