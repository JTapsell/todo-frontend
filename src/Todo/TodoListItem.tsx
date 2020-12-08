import './Todo.css';

import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface TodoProps {
  todo: { description: String; checked: Boolean; id: String };
}

export const TodoListItem: FunctionComponent<TodoProps> = (props: TodoProps) => {
  const { todo } = props;
  return (
    <li className='todo-item'>
      <p className={todo.checked === true ? 'is-done' : ''}>{todo.description}</p>
      <Link to={`/todo/${todo.id}`}>Edit</Link>
    </li>
  );
};
