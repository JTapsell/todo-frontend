import React, { FunctionComponent, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../context/AuthContext';
import { useHttpRequest } from '../hooks/useHttpRequest';

export const Login: FunctionComponent = () => {
  const { register, handleSubmit, errors } = useForm();
  const { sendRequest } = useHttpRequest();
  const auth = useContext(AuthContext);

  const loginOnSubmit = async event => {
    const { email, password } = event;
    try {
      const response = await sendRequest({
        url: 'http://localhost:8080/api/users/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseData = await response;
      auth.login(responseData.userId, responseData.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(loginOnSubmit)}>
        <input type='email' placeholder='email' name='email' ref={register({ required: true })} />
        {errors.email && <span>This field is required</span>}
        <input type='password' placeholder='password' name='password' ref={register({ required: true })} />
        {errors.password && <span>This field is required</span>}
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
