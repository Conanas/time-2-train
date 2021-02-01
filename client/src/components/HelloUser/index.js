import React from 'react';
import { useUserContext } from '../../utils/contexts/UserContext';

export default function HelloUser() {
  const [userState] = useUserContext();
  return (
    <div className="sign-in-out">
      {userState.email !== null ? <label className="flow-text">Signed in: {userState.givenName}&nbsp;</label> : null}
    </div>
  )
}