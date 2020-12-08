/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent, useContext, useRef } from 'react';

import { AuthContext } from '../context/AuthContext';
import { useHttpRequest } from '../hooks/useHttpRequest';

export const AddTodo: FunctionComponent = () => {
  const addTodo = useRef<HTMLInputElement | null>(null);
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpRequest();

  const addClickHandler = async () => {
    const inputVal = addTodo.current.value;
    try {
      const response = await sendRequest({
        url: 'http://localhost:8080/api/todos/',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: auth.userId,
          description: inputVal,
          checked: false,
        }),
      });
      const responseData = await response;
      console.log(responseData);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <input ref={addTodo} placeholder='Add Todo' />
      <button type='button' onClick={addClickHandler}>
        Add
      </button>
    </div>
  );
};
