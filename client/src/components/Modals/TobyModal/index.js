import React, { useEffect, useRef } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { MODES } from '../../../utils/timer/modes';
import toby1 from '../../../assets/images/toby_1.jpg';
import toby2 from '../../../assets/images/toby_2.jpg';
import toby3 from '../../../assets/images/toby_3.jpg';
import toby4 from '../../../assets/images/toby_4.jpg';
import toby5 from '../../../assets/images/toby_5.jpg';
import toby6 from '../../../assets/images/toby_6.jpg';
import toby7 from '../../../assets/images/toby_7.jpg';
import toby8 from '../../../assets/images/toby_8.jpg';
import toby9 from '../../../assets/images/toby_9.jpg';
import toby10 from '../../../assets/images/toby_10.jpg';
import toby11 from '../../../assets/images/toby_11.jpg';
import toby12 from '../../../assets/images/toby_12.jpg';
import toby13 from '../../../assets/images/toby_13.png';
import toby14 from '../../../assets/images/toby_14.png';
import toby15 from '../../../assets/images/toby_15.png';
import toby16 from '../../../assets/images/toby_16.png';
import './style.css';

export default function TobyModal({ timerState }) {

  const modalRef = useRef();

  const tobyImages = [toby1, toby2, toby3, toby4, toby5, toby6, toby7, toby8, toby9, toby10, toby11, toby12, toby13, toby14, toby15, toby16]

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
        <img className='toby-image' src={tobyImages[Math.ceil(Math.random() * tobyImages.length)]} alt='toby'></img>
      </div>
      <div className="modal-footer">
        <button className="modal-close btn-flat">Confirm</button>
      </div>
    </div>
  )
}
