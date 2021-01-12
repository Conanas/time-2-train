import React, { useEffect } from 'react';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/GlobalState";
import ListItems from '../../components/ListItems/';
import StartSaveLoadButtons from '../../components/StartSaveLoadButtons/';
import { SET_ACTIONS } from '../../utils/actions';
import './style.css';

export default function StartEditTimer() {
  const [state, dispatch] = useWorkoutContext();

  useEffect(() => {
    API.getWorkout("5ffd461159d75244a057d2f7")
      .then(res => {
        dispatch({ type: SET_ACTIONS.workout, payload: res.data });
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <div>
        <h1 className="flow-text">Start/Edit Workout</h1>
        <ul className="edit-timer-list">
          <ListItems />
        </ul>
      </div>
      <StartSaveLoadButtons />
    </>
  )
}