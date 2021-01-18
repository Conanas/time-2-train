import React from 'react';
import Auth from '../../utils/Auth';
import './style.css';

export default function LoginPage() {

  function googleLogin() {
    // try {
    //   console.log('started')
    //   let data = await Auth.authGoogle();
    //   console.log('complete')
    //   console.log(data)
    // } catch (error) {
    //   console.log("error")
    //   console.log(error)
    // }
    Auth.authGoogle().then(res => res.send()).catch(err => console.log(err))
    // window.open("http://localhost:3000/auth/google", "_self");
  }

  return (
    <>
      <h4>Login</h4>
      <button onClick={googleLogin}>Google+ Login</button>
    </>
  )
}