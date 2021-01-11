import React from 'react';
import ListItems from '../../components/ListItems/';
import './style.css';

export default function StartEditTimer() {
  return (
    <>
      <h1 className="flow-text">Start/Edit Workout</h1>
      <ul className="edit-timer-list">
        <ListItems />
      </ul>
      <input className="form-button" type="button" value="Start"></input>
      <input className="form-button" type="button" value="Save"></input>
      <input className="form-button" type="button" value="Load"></input>
    </>
  )
}