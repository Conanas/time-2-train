import React from 'react';
import { useWorkoutContext } from "../../utils/GlobalState";
import { SET_ACTIONS } from '../../utils/actions';
import API from '../../utils/API';
import './style.css';

export default function StartSaveLoadButtons() {
  const [state, dispatch] = useWorkoutContext();

  function saveWorkout() {
    API.postWorkout(state)
      .then(res => res.json)
      .catch(err => console.log(err));
  }

  return (
    <>
      <div className="button-div">
        <input className="form-button" type="button" value="Start"></input>
        <input className="form-button modal-trigger" type="button" value="Save" data-target="save-modal"></input>
        {/* <input className="form-button" type="button" value="Save" onClick={(() => saveWorkout)}></input> */}
        <input className="form-button" type="button" value="Load"></input>
      </div>

      {/* <!-- Modal Structure --> */}
      <div id="save-modal" class="modal">
        <div class="modal-content">
          <h4>Enter Save Name</h4>
          <input type="text" onChange={((e) => dispatch({ type: SET_ACTIONS.title, payload: e.target.value }))} />
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat" onClick={(() => saveWorkout())}>Save</a>
        </div>
      </div>
    </>
  )
}