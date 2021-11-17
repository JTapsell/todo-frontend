import './Todo.css';

import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

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
  const addTodo = useRef<HTMLInputElement | null>(null);

  const addClickHandler = async () => {
    const inputVal = addTodo.current.value;
    try {
      const response = await sendRequest({
        url: 'http://localhost:8080/api/todos/',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` },
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
      <input ref={addTodo} placeholder='Add Todo' />
      <button type='button' onClick={addClickHandler}>
        Add
      </button>
      <ul className='todo-list'>
        {todoList.map((todo: ITodo) => {
          return <TodoListItem todo={todo} />;
        })}
      </ul>
    </div>
  );
};
