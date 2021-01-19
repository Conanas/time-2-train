import React from 'react';
import GoogleLogin from '../../components/GoogleButtons/GoogleLogin';
import GoogleLogout from '../../components/GoogleButtons/GoogleLogout';
import './style.css';

export default function LoginPage() {
  return (
    <>
      <h4>Login</h4>
      <GoogleLogin />
      <GoogleLogout />
    </>
  )
}