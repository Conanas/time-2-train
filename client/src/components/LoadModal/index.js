import React from 'react';
import { useLoadContext } from '../../utils/LoadContext';
import './style.css';

export default function LoadModal() {
  const [loadState, loadDispatch] = useLoadContext();

  return (
    <div id="load-modal" className="modal">
      <div className="modal-content">
        <h4>Workout Details</h4>
        <label>Workout Details</label>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">Load</button>
      </div>
    </div>
  )
}