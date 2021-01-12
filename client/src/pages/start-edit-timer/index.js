import React, { useEffect } from 'react';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/GlobalState";
import ListItems from '../../components/ListItems/';
import './style.css';

export default function StartEditTimer() {
  const [state, dispatch] = useWorkoutContext();

  useEffect(() => {
    API.getWorkouts()
      .then(res =>
        console.log(res.data)
      )
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <h1 className="flow-text">Start/Edit Workout</h1>
      <ul className="edit-timer-list">
        <ListItems />
      </ul>
      <input className="form-button" type="button" value="Start"></input>
      <input className="form-button" type="button" value="Save"></input>
      <input className="form-button" type="button" value="Load"></input>
    </>
  )
}