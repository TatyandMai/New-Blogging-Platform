import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.css";
import { useContext, useRef } from 'react';
import { loginCall } from '../../state/ActionCalls';
import { AuthContext } from '../../state/AuthContext';


export default function Login() {

    const email = useRef(); //to refer input value in form
    const password = useRef();
    const { user, dispatch } = useContext(AuthContext); // to use value in AuthContext.js

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall( //loginCall comes from ActionCalls.js
            {
                email: email.current.value,
                password: password.current.value,
            },
            dispatch //value in AuthContext.js
        );
    };

    console.log(user)

  return (
    <>
        <div className="login-container">
            <form className='login-form' onSubmit={(e) => handleSubmit(e)}>
                <h1 className='login-title'>Login</h1>
                <input
                className='login-input'
                type='email'
                placeholder="Email"
                required
                ref={email} //useRef
                />
                <input
                className='login-input'
                type='password'
                placeholder="Password"
                required
                minLength="6"
                ref={password}
                />
                <button className='loginButton'>Login</button>
                <span className='login-span'>
                Don't have an account? <Link className="login-link" to="/register"> Register</Link>
                </span>
            </form>
        </div>
    </>
  )
}
