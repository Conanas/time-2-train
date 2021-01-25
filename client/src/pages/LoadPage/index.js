import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import { useLoadContext } from '../../utils/LoadContext';
import { useUserContext } from '../../utils/UserContext';
import { SET_ACTIONS, MESSAGES } from '../../utils/actions';
import API from '../../utils/API';
import LoadModal from '../../components/Modals/LoadModal/';
import DeleteModal from '../../components/Modals/DeleteModal/';
import MessageModal from '../../components/Modals/MessageModal/';
import './style.css';

export default function LoadPage() {
  const [loadState, loadDispatch] = useLoadContext();
  const [workoutState, workoutDispatch] = useWorkoutContext();
  const [userState, dispatchUser] = useUserContext();

  const [selectState, setSelect] = useState();

  let collapsibleRef = useRef();

  async function deleteWorkout(workoutId) {
    try {
      console.log("delete workout: ", workoutId)
      await API.deleteWorkout(workoutId)
    } catch (error) {
      console.log(error)
    }
  }

  function getWorkouts() {
    API.getWorkouts(userState._id)
      .then(res => {
        loadDispatch({ type: SET_ACTIONS.import, payload: res.data })
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
    M.Collapsible.init(collapsibleRef.current);
    if (userState._id !== null) {
      getWorkouts();
    }
  }, [userState])

  return (
    <>
      <h4>Load Workout</h4>
      <div className="load-list">
        {userState.email === null ?
          <label className="flow-text">{MESSAGES.MUST_BE_SIGNED_IN_TO_LOAD}</label>
          :
          <ul
            ref={collapsibleRef}
            className="collapsible popout"
          >
            {loadState.map((workout, index) => {
              return (
                <li key={index} onClick={() => setSelect(workout)}>
                  <div className="collapsible-header">
                    {workout.title}
                  </div>
                  <div className="collapsible-body flow-text">
                    <div className="collapsible-body-div">
                      <button><i className="fas fa-play"></i></button>
                      <button><i className="fas fa-edit"></i></button>
                      <button className="modal-trigger" data-target="delete-modal"><i className="fas fa-trash-alt"></i></button>
                    </div>
                  </div>
                </li>
              )
            })
            }
          </ul>
        }
      </div>
      <LoadModal />
      <DeleteModal getWorkouts={getWorkouts} deleteWorkout={deleteWorkout} workoutId={selectState ? selectState._id : null} />
      {/* <MessageModal message={"Are you sure?"} deleteMode={true}  /> */}
    </>
  )
}
