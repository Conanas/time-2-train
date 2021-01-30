import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import M from "materialize-css";
import { useWorkoutContext } from '../../../utils/contexts/WorkoutContext';
import { SET_ACTIONS, BUTTONS } from '../../../utils/contexts/actions';
import './style.css';

export default function LoadModal({ workout }) {
  const [, dispatchWorkout] = useWorkoutContext();
  const modalRef = useRef();

  useEffect(() => {
    const options = {
      onOpenStart: () => { },
      onOpenEnd: () => { },
      onCloseStart: () => { },
      onCloseEnd: () => { },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(modalRef.current, options);
  }, [])

  function renderWorkoutDetails(workout, key) {

    if (key === "continuous" || key === "prepare" || key === "reps" || key === "rest" || key === "work" || key === "sets" || key === "break") {
      return (`${key.charAt(0).toUpperCase() + key.slice(1)}: ${workout[key]}`)
    } else {
      return null
    }
  }

  return (
    <div id="load-modal" className="modal" ref={modalRef}>
      <div className="modal-content">
        <h4>{workout ? workout.title : null}</h4>
        <ul>
          {workout ?
            Object.keys(workout).map((key, index) => {
              return (
                <li key={index}>
                  {renderWorkoutDetails(workout, key)}
                </li>
              )
            })
            :
            null}
        </ul>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">{BUTTONS.CANCEL}</button>
        <Link to="/timer" onClick={() => {
          dispatchWorkout({ type: SET_ACTIONS.workout, payload: workout })
          localStorage.setItem("workoutId", workout._id)
        }
        }>
          <button className="modal-close waves-effect waves-green btn-flat">
            {BUTTONS.LOAD}
          </button>
        </Link>
      </div>
    </div >
  )
}