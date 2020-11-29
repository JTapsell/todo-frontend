import React from 'react';

export const Login = () => {
  return (
    <div>
      <form>
        <input type='email' placeholder='email' />
        <input type='password' placeholder='password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
