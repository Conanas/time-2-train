import React from 'react';

export default function MessageModal({ message, deleteMode, deleteWorkout, workoutId }) {
  return (
    <div id="save-modal" className="modal">
      <div className="modal-content">
        <h4 className="flow-text">{message}</h4>
      </div>
      <div className="modal-footer">
        {deleteMode ?
          <>
            <button className="modal-close waves-effect waves-green btn-flat">Cancel</button>
            <button className="modal-close waves-effect waves-green btn-flat" onClick={() => deleteWorkout(workoutId)}>Confirm</button>
          </>
          :
          <button className="modal-close waves-effect waves-green btn-flat">Confirm</button>
        }
      </div>
    </div>
  )
}
