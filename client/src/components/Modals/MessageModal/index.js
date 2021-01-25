import React from 'react';
import { BUTTONS } from '../../../utils/actions';

export default function MessageModal({ message }) {
  return (
    <div id="message-modal" className="modal">
      <div className="modal-content">
        <h4 className="flow-text">{message}</h4>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">{BUTTONS.CONFIRM}</button>
      </div>
    </div>
  )
}
