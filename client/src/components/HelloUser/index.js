import React from 'react';
import { useUserContext } from '../../utils/UserContext';
import './style.css';

export default function HelloUser() {
  const [userState] = useUserContext();
  return (
    <div className="sign-in-out">
      {userState.email !== null ? <span>Hello {userState.givenName}&nbsp;</span> : null}
    </div>
  )
}