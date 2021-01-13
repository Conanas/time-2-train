import React, { useEffect } from 'react';
import { useWorkoutContext } from '../../utils/GlobalState';
import { useLoadContext } from '../../utils/LoadContext';
import { SET_ACTIONS } from '../../utils/actions';
import API from '../../utils/API';
import LoadModal from '../../components/LoadModal/';
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
      <h4>Load Workout</h4>
      <div className="load-list">
        {loadState.map((workout, index) => {
          return (
            <label className="load-label flow-text" key={index}>
              <div>
                <input type="radio" name="workouts" id={workout.id} />
                <span>{workout.title}</span>
              </div>
              <div>
                <i className="fas fa-times"></i>
              </div>
            </label>
          )
        })}
      </div>
      <div className="button-div">
        <button className="load-button modal-trigger" data-target="load-modal">Load</button>
      </div>
      <LoadModal />
    </>
  )
}