import React, { useEffect, useRef } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { BUTTONS } from '../../../utils/contexts/actions';

export default function MessageModal({ message }) {

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
    <div id="message-modal" className="modal" ref={modalRef}>
      <div className="modal-content">
        <h4 className="flow-text">{message}</h4>
      </div>
      <div className="modal-footer">
        <button className="modal-close btn-flat">{BUTTONS.CONFIRM}</button>
      </div>
    </div>
  )
}
