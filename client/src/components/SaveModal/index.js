import React from 'react';

export default function SaveModal() {
  return (
    <div id="save-modal" className="modal">
      <div className="modal-content">
        <h4 className="flow-text">Workout has been saved</h4>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">Confirm</button>
      </div>
    </div>
  )
}
