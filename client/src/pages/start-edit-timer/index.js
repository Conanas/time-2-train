import React, { useEffect } from 'react';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/GlobalState";
import ListItems from '../../components/ListItems/';
import { SET_WORKOUT } from '../../utils/actions';
import './style.css';

export default function StartEditTimer() {
  const [state, dispatch] = useWorkoutContext();

  // useEffect(() => {
  //   API.getWorkout("5ffd230c7de42e32f4c7dd53")
  //     .then(res => {
  //       console.log(res.data);
  //       dispatch({ type: SET_WORKOUT, payload: res.data });
  //       console.log(state);
  //     })
  //     .catch(error => console.log(error))
  // }, [])

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