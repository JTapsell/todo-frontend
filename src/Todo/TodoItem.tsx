import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpRequest } from '../hooks/useHttpRequest';

type Todo = { description: String; checked: Boolean } | null;

export const TodoItem = () => {
  const [todo, setTodo] = useState<Todo>(null);
  const { sendRequest } = useHttpRequest();
  const { todoId } = useParams();
  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const fetchTodo = async () => {
      try {
        const response = await sendRequest({
          url: `http://localhost:8080/api/todos/todo/${todoId}`,
          method: 'GET',
        });
        const responseData = await response;
        setTodo(responseData.todo);
      } catch (err) {
        return null;
      }
    };
    fetchTodo();
  }, [sendRequest]);

  return (
    <div>
      <p>{todo && todo.description}</p>
      <button className='todo-button' type='button'>
        Done?
      </button>
      <button className='todo-button' type='button'>
        Remove
      </button>
    </div>
  );
};
