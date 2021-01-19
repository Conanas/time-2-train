import React from 'react';
import { useGoogleLogout } from 'react-google-login';

const clientId = '21174679375-ueqsp2fchfubf00bq445tkki7voqs47c.apps.googleusercontent.com';

export default function GoogleLogout() {

  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    alert('Logged out Successfully ✌');
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
    <button onClick={signOut} className="google-button">
      <img src="/icons/google.svg" alt="google login" className="icon"></img>

      <span className="google-button-text">Sign out</span>
    </button>
  );
}
