import React, { useEffect } from 'react';
import API from '../../utils/API';
import { SET_ACTIONS } from '../../utils/actions';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import './style.css';

export default function TimerPage() {
  const [workoutState, dispatchWorkout] = useWorkoutContext();

  useEffect(() => {
    console.log(workoutState)
    let workoutId = localStorage.workoutId
    API.getWorkout(workoutId)
      .then(res => {
        if (res.data) {
          dispatchWorkout({ type: SET_ACTIONS.workout, payload: res.data });
        }
      }).catch(err => console.log(err))
  }, [])

  return (
    <>
      {Object.keys(workoutState).map((key, index) => {
        if (key === "_id") {
          return null
        }
        if (key === "continuous") {
          return <label key={index}>{key} : {workoutState[key] === true ? "true" : "false"}</label>
        }
        return <label key={index}>{key} : {workoutState[key]}</label>
      })}
    </>
  )
}