import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { useHttpRequest } from '../hooks/useHttpRequest';

type Todo = { description: String; checked: Boolean } | null;

export const TodoItem = () => {
  const [todo, setTodo] = useState<Todo>(null);
  const { sendRequest } = useHttpRequest();
  const { todoId } = useParams();
  const auth = useContext(AuthContext);
  const history = useHistory();
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

  const onDeleteHandler = async () => {
    try {
      await sendRequest({
        headers: { Authorization: `Bearer ${auth.token}` },
        url: `http://localhost:8080/api/todos/todo/${todoId}`,
        method: 'DELETE',
      });
      history.push('/todos');
    } catch (err) {
      return null;
    }
    return null;
  };

  return (
    <div>
      <p>{todo && todo.description}</p>
      <button className='todo-button' type='button'>
        Done?
      </button>
      <button onClick={onDeleteHandler} className='todo-button' type='button'>
        Remove
      </button>
    </div>
  );
};
