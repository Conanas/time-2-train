import React, { useEffect } from 'react';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import './style.css';

export default function TimerPage() {
  const [workoutState, dispatchWorkout] = useWorkoutContext();
  console.log(workoutState)

  useEffect(() => {
    console.log(workoutState)
  }, [])

  return (
    <>
      {Object.keys(workoutState).map((key, index) => <label key={index}>{key} : {workoutState[key]}</label>)}
    </>
  )
}