import React, { FunctionComponent } from 'react';

export const SignUp: FunctionComponent = () => {
  return (
    <form>
      <input type='text' placeholder='First Name' />
      <input type='text' placeholder='Last Name' />
      <input type='email' placeholder='Email' />
      <input type='password' placeholder='Password' />
      <button type='submit'>Register</button>
    </form>
  );
};
