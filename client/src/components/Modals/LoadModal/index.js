import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import M from "materialize-css";
import { BUTTONS } from '../../../utils/actions';
import { useWorkoutContext } from '../../../utils/WorkoutContext';
import './style.css';

export default function LoadModal() {
  const [workoutState] = useWorkoutContext();
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
    console.log(modalRef)
    M.Modal.init(modalRef.current, options);
  }, [])

  return (
    <div id="load-modal" className="modal" ref={modalRef}>
      <div className="modal-content">
        <h4>{workoutState.title}</h4>
        <ul>
          {Object.keys(workoutState).map((key, index) => {
            return (
              <li key={index}>
                {key !== "_id" ?
                  key !== "title" ?
                    `${key.charAt(0).toUpperCase() + key.slice(1)}: ${workoutState[key]}`
                    : null
                  : null}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="modal-footer">
        <Link to="/">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => {
              localStorage.setItem("workoutId", workoutState._id)
            }}
          >
            {BUTTONS.LOAD}
          </button>
        </Link>
      </div>
    </div>
  )
}