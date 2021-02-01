import React, { useEffect, useRef } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { START } from '../../../utils/contexts/edit-state-strings';
import { MESSAGES } from '../modal-messages';
import { useWorkoutContext } from '../../../utils/contexts/WorkoutContext';
import { useEditContext } from '../../../utils/contexts/EditContext';
import API from '../../../utils/API';

export default function UpdateModal() {
  const [workoutState] = useWorkoutContext();
  const [, editDispatch] = useEditContext();

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

  function updateWorkout() {
    editDispatch({ type: START })
    API.putWorkout(workoutState)
      .then(res => res.json)
      .catch(err => console.log(err));
  }

  return (
    <div id="save-message-modal" className="modal" ref={modalRef}>
      <div className="modal-content">
        <h4 className="flow-text">{MESSAGES.ARE_YOU_SURE}</h4>
        <label>{MESSAGES.OVERWRITE}</label>
      </div>
      <div className="modal-footer">
        <button className="modal-close btn-flat">Cancel</button>
        <button className="modal-close btn-flat" onClick={() => updateWorkout()}>Confirm</button>
      </div>
    </div >
  )
}