import React from 'react';
import { useUserContext } from '../../utils/UserContext';
import GoogleLogin from '../GoogleButtons/GoogleLogin';
import GoogleLogout from '../GoogleButtons/GoogleLogout';
import './style.css';

export default function SignInOut() {
  const [userState, dispatchUser] = useUserContext();
  return (
    <div className="row sign-in-out">
      {userState.email !== null ? <span>Hello {userState.givenName}&nbsp;</span> : null}
      {userState.email === null ? <GoogleLogin /> : <GoogleLogout />}
    </div>
  )
}