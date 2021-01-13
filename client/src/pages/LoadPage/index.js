import React, { useEffect } from 'react';
import { useWorkoutContext } from '../../utils/GlobalState';
import { useLoadContext } from '../../utils/LoadContext';
import API from '../../utils/API';
import './style.css';

export default function LoadPage() {
  const [loadState, loadDispatch] = useLoadContext();
  const [workoutState, workoutDispatch] = useWorkoutContext();

  useEffect(() => {
    API.getWorkouts()
      .then(res => {
        loadDispatch({ type: '', payload: '' })
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <h1 className="flow-text">Load Workout</h1>
      <ul>
        {Object.keys(state).map((workout, index) => {
          return (
            <li key={index}>{workout.title}</li>
          )
        })}
      </ul>
    </>
  )
}