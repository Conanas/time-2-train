import React, { useEffect } from 'react';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import { useLoadContext } from '../../utils/LoadContext';
import { userUserContext, useUserContext } from '../../utils/UserContext';
import { SET_ACTIONS } from '../../utils/actions';
import API from '../../utils/API';
import LoadModal from '../../components/LoadModal/';
import './style.css';

export default function LoadPage() {
  const [loadState, loadDispatch] = useLoadContext();
  const [, workoutDispatch] = useWorkoutContext();
  const [userState, dispatchUser] = useUserContext();

  useEffect(() => {
    API.getWorkouts()
      .then(res => {
        loadDispatch({ type: SET_ACTIONS.import, payload: res.data })
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <h4>Load Workout</h4>
      <div className="load-list">
        {userState.email === null ?
          <label className="flow-text">You must be signed in to load a workout</label>
          :
          loadState.map((workout, index) => {
            return (
              <label className="load-label flow-text" key={index}>
                <div>
                  <input className="load-radio" type="radio" name="workouts" id={workout._id} onChange={(() => workoutDispatch({ type: SET_ACTIONS.workout, payload: workout }))} />
                  <span><label className="flow-text">{workout.title}</label></span>
                </div>
                <div>
                  <i className="fas fa-times"></i>
                </div>
              </label>
            )
          })
        }
      </div>
      {userState.email === null ?
        null
        :
        <div className="button-div">
          <button className="show-button modal-trigger" data-target="load-modal">Show</button>
        </div>}
      <LoadModal />
    </>
  )
}