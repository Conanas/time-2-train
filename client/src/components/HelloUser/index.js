import React from 'react';
import { useUserContext } from '../../utils/contexts/UserContext';
import './style.css';

export default function HelloUser() {
  const [userState] = useUserContext();
  return (
    <div className="sign-in-out">
      {userState.email !== null ? <label className="flow-text">Hello {userState.givenName}&nbsp;</label> : null}
    </div>
  )
}