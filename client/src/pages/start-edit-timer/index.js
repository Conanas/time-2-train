import React from 'react';
import { useWorkoutContext } from "../../utils/GlobalState";
import {
  SET_CONTINUOUS,
  SET_PREPARE,
  SET_REPS,
  SET_WORK,
  SET_REST,
  SET_SETS,
  SET_BREAK
} from '../../utils/actions';
import {
  CONTINUOUS,
  WORK
} from '../../utils/list-titles';
import './style.css';

export default function StartEditTimer() {
  const [state, dispatch] = useWorkoutContext();

  function renderContinuous(state) {
    if (state.continuous.value === true) {
      return <i className="fa-icon fas fa-toggle-on flow-text" onClick={() => dispatch({ type: state.continuous.action, payload: false })}></i>
    }
    return <i className="fa-icon fas fa-toggle-off flow-text" onClick={() => dispatch({ type: state.continuous.action, payload: true })}></i>
  }

  return (
    <>
      <h1 className="flow-text">Start/Edit Workout</h1>
      <ul className="edit-timer-list">

        {Object.keys(state).map(item => {
          return (
            <li className="edit-timer-list-item">
              <label className="flow-text">{state[item].title}</label>
              {state[item].title === CONTINUOUS ? renderContinuous(state) :
                <>
                  <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: state[item].action, payload: -1 })}></i>
                  <div className="workout-units flow-text">
                    <input type="number" value={state[item].value} />
                  </div>
                  <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: state[item].action, payload: 1 })}></i>
                </>
              }
            </li>
          )
        })}

        {/* Prepare */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Prepare</label>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_PREPARE, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input type="number" value={state.prepare} />
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_PREPARE, payload: +1 })}></i>
        </li>

        {/* Reps */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Reps</label>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_REPS, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input type="number" value={state.reps} />
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_REPS, payload: +1 })}></i>
        </li>

        {/* Work */}
        {state.continuous === true ?
          <li className="edit-timer-list-item">
            <label className="flow-text">Work</label>
            <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_WORK, payload: -1 })}></i>
            <div className="workout-units flow-text">
              <input type="number" value={state.work} />
            </div>
            <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_WORK, payload: +1 })}></i>
          </li> :
          null}

        {/* Rest */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Rest</label>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_REST, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input type="number" value={state.rest} />
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_REST, payload: +1 })}></i>
        </li>

        {/* Sets */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Sets</label>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_SETS, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input type="number" value={state.sets} />
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_SETS, payload: +1 })}></i>
        </li>

        {/* Break */}
        <li className="edit-timer-list-item">
          <label className="flow-text">Break</label>
          <i className="fa-icon far fa-minus-square flow-text" onClick={() => dispatch({ type: SET_BREAK, payload: -1 })}></i>
          <div className="workout-units flow-text">
            <input type="number" value={state.break} />
          </div>
          <i className="fa-icon far fa-plus-square flow-text" onClick={() => dispatch({ type: SET_BREAK, payload: +1 })}></i>
        </li>

      </ul>
      <input className="form-button" type="button" value="Start"></input>
      <input className="form-button" type="button" value="Save"></input>
      <input className="form-button" type="button" value="Load"></input>
    </>
  )
}