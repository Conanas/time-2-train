import React, { useEffect, useRef } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { MODES } from '../../../utils/timer/modes';

export default function TobyModal({ timerState }) {

  const modalRef = useRef();

  if (timerState.mode === MODES.COMPLETED) {
    M.Modal.getInstance(modalRef.current).open()
  }

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
    <div id="toby-modal" className="modal" ref={modalRef}>
      <div className="modal-content">
        <h4 className="flow-text">Toby Image</h4>
      </div>
      <div className="modal-footer">
        <button className="modal-close btn-flat">Confirm</button>
      </div>
    </div>
  )
}
