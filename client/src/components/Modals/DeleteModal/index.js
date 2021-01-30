import React, { useEffect, useRef } from 'react';
import M from "materialize-css";
import { MESSAGES, BUTTONS } from '../../../utils/contexts/actions';

export default function DeleteModal({ getWorkouts, deleteWorkout, workoutId }) {
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

  return (
    <>
      <div id="delete-modal" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4 className="flow-text">{MESSAGES.ARE_YOU_SURE}</h4>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat">{BUTTONS.CANCEL}</button>
          <button className="modal-close waves-effect waves-green btn-flat"
            onClick={() => {
              deleteWorkout(workoutId)
              localStorage.setItem("workoutId", null)
              getWorkouts();
            }}
          >
            {BUTTONS.CONFIRM}
          </button>
        </div>
      </div>
    </>
  )
}