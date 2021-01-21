import React from 'react';

export default function SaveModal(props) {
  return (
    <div id="save-modal" className="modal">
      <div className="modal-content">
        <h4 className="flow-text">{props.message}</h4>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">Confirm</button>
      </div>
    </div>
  )
}
