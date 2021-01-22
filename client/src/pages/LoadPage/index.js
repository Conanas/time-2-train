import React, { useEffect } from 'react';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import { useLoadContext } from '../../utils/LoadContext';
import { useUserContext } from '../../utils/UserContext';
import { SET_ACTIONS } from '../../utils/actions';
import API from '../../utils/API';
import LoadModal from '../../components/LoadModal/';
import MessageModal from '../../components/MessageModal/';
import './style.css';

export default function LoadPage() {
  const [loadState, loadDispatch] = useLoadContext();
  const [workoutState, workoutDispatch] = useWorkoutContext();
  const [userState, dispatchUser] = useUserContext();

  async function deleteWorkout(workoutId) {
    try {
      console.log("delete workout: ", workoutId)
      await API.deleteWorkout(workoutId)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userState._id !== null) {
      API.getWorkouts(userState._id)
        .then(res => {
          loadDispatch({ type: SET_ACTIONS.import, payload: res.data })
        })
        .catch(error => console.log(error))
    }
  }, [userState])

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
                  <i className="fas fa-times modal-trigger"
                    data-target="save-modal"></i>
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
      <MessageModal message={"Are you sure?"} deleteMode={true} deleteWorkout={deleteWorkout} workoutId={workoutState._id} />
    </>
  )
}