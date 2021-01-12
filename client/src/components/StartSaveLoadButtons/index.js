import React from 'react';
import './style.css';

export default function StartSaveLoadButtons() {
  return (
    <div className="button-div">
      <input className="form-button" type="button" value="Start"></input>
      <input className="form-button modal-trigger" type="button" value="Save" data-target="save-modal"></input>
      {/* <input className="form-button" type="button" value="Load"></input> */}
    </div>
  )
}