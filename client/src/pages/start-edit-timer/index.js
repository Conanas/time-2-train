import React, { useEffect } from 'react';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/GlobalState";
import ListItems from '../../components/ListItems/';
import StartSaveLoadButtons from '../../components/StartSaveLoadButtons/';
import { SET_ACTIONS } from '../../utils/actions';
import './style.css';

export default function StartEditTimer(props) {
  const [state, dispatch] = useWorkoutContext();

  useEffect(() => {
    if (props.match.params.id) {
      API.getWorkout(props.match.params.id)
        .then(res => {
          dispatch({ type: SET_ACTIONS.workout, payload: res.data });
        })
        .catch(error => console.log(error))
    }
  }, [])

  return (
    <>
      <div className="row">
        <h4>Start/Edit Workout</h4>
        <ul className="edit-timer-list">
          <ListItems />
        </ul>
      </div>
      <StartSaveLoadButtons />
    </>
  )
}