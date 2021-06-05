import React from 'react';
import { Link } from 'react-router-dom'
import { useGoogleLogout } from 'react-google-login';
import { useWorkoutContext } from '../../utils/contexts/WorkoutContext';
import { SET_ACTIONS } from '../../utils/contexts/actions';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function GoogleLogout() {
  const [, dispatchWorkout] = useWorkoutContext();

  const onLogoutSuccess = (res) => {
    dispatchWorkout({ type: SET_ACTIONS.reset })
    console.log('Logged out Success');
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <Link to="" onClick={signOut} className="google-button nav-item">
      Sign out
    </Link>
  );
}
