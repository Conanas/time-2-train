import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useLoadContext } from '../../utils/contexts/LoadContext';
import { useWorkoutContext } from '../../utils/contexts/WorkoutContext';
import { useUserContext } from '../../utils/contexts/UserContext';
import { SET_ACTIONS } from '../../utils/contexts/actions';
import { MESSAGES } from '../../components/Modals/modal-messages';
import API from '../../utils/API';
import LoadModal from '../../components/Modals/LoadModal/';
import DeleteModal from '../../components/Modals/DeleteModal/';
import './style.css';

export default function LoadPage() {
  const [loadState, loadDispatch] = useLoadContext();
  const [userState] = useUserContext();
  const [, dispatchWorkout] = useWorkoutContext();

  const [selectState, setSelect] = useState();

  let collapsibleRef = useRef();

  async function deleteWorkout(workoutId) {
    try {
      await API.deleteWorkout(workoutId)
      await API.putUserDeleteWorkout(userState._id, workoutId)
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
        {userState._id === null ?
          <label className="flow-text">{MESSAGES.MUST_BE_SIGNED_IN_TO_LOAD}</label>
          :
          <ul
            ref={collapsibleRef}
            className="collapsible popout"
          >
            {loadState.length === 0 ?
              <label className="flow-text">You have no saved workouts</label>
              :
              loadState.map((workout, index) => {
                return (
                  <li key={index} onClick={() => setSelect(workout)}>
                    <div className="collapsible-header">
                      {workout.title}
                    </div>
                    <div className="collapsible-body flow-text">
                      <div className="collapsible-body-div">
                        <button className="modal-trigger" data-target="delete-modal"><i className="fas fa-trash-alt"></i></button>
                        <Link to="/edit" onClick={() => selectState ? dispatchWorkout({ type: SET_ACTIONS.workout, payload: selectState }) : null}>
                          <button><i className="fas fa-edit"></i></button>
                        </Link>
                        <button className="modal-trigger" data-target="load-modal"><i className="fas fa-play"></i></button>
                      </div>
                    </div>
                  </li>
                )
              })

            }
          </ul>
        }
      </div>
      <LoadModal workout={selectState ? selectState : null} />
      <DeleteModal getWorkouts={getWorkouts} deleteWorkout={deleteWorkout} workoutId={selectState ? selectState._id : null} />
    </>
  )
}
