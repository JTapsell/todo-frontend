import React, { FunctionComponent, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../context/AuthContext';

export const SignUp: FunctionComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loggedIn, setLoggedIn] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const auth = useContext(AuthContext);

  const signupOnSubmit = (event): void => {
    const { firstName, lastName, email, password, confirmPassword } = event;
    fetch('http://localhost:8080/api/users/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }),
    })
      .then(res =>
        res.json().then(data => {
          auth.login(data.user.id);
        })
      )
      .catch(err => console.log(err));
  };
  return (
    <form onSubmit={handleSubmit(signupOnSubmit)}>
      <input type='text' ref={register({ required: true })} name='firstName' placeholder='First Name' />
      {errors.firstName && <span>This field is required</span>}
      <input type='text' ref={register({ required: true })} name='lastName' placeholder='Last Name' />
      {errors.lastName && <span>This field is required</span>}
      <input type='email' ref={register({ required: true })} name='email' placeholder='Email' />
      {errors.email && <span>This field is required</span>}
      <input type='password' ref={register({ required: true, min: 6 })} name='password' placeholder='Password' />
      {errors.password && <span>This field is required</span>}
      <input type='password' ref={register({ required: true, min: 6 })} name='confirmPassword' placeholder='Password' />
      {errors.confirmPassword && <span>This field is required</span>}
      <button type='submit'>Register</button>
    </form>
  );
};
