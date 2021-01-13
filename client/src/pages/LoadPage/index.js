import React, { useEffect } from 'react';
import { useWorkoutContext } from '../../utils/GlobalState';
import { useLoadContext } from '../../utils/LoadContext';
import { SET_ACTIONS } from '../../utils/actions';
import API from '../../utils/API';
import './style.css';

export default function LoadPage() {
  const [loadState, loadDispatch] = useLoadContext();
  const [workoutState, workoutDispatch] = useWorkoutContext();

  useEffect(() => {
    API.getWorkouts()
      .then(res => {
        loadDispatch({ type: SET_ACTIONS.import, payload: res.data })
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      {console.log(loadState)}
      <h1 className="flow-text">Load Workout</h1>
      <ul>
        {loadState.map((workout, index) => {
          return (
            <li key={index}>{workout.title}</li>
          )
        })}
      </ul>
    </>
  )
}