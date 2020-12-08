import './Todo.css';

import React, { FunctionComponent, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { useHttpRequest } from '../hooks/useHttpRequest';
import { TodoListItem } from './TodoListItem';

interface ITodo {
  description: string;
  checked: Boolean;
  id: String;
}

export const TodoList: FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpRequest();
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const fetchTodos = async () => {
      try {
        const response = await sendRequest({
          url: `http://localhost:8080/api/todos/${auth.userId}`,
          method: 'GET',
        });
        setTodoList(response.todos);
      } catch (err) {
        return null;
      }
    };
    fetchTodos();
  }, [sendRequest]);

  return (
    <div>
      <ul className='todo-list'>
        {todoList.map((todo: ITodo) => {
          return <TodoListItem todo={todo} />;
        })}
      </ul>
    </div>
  );
};
