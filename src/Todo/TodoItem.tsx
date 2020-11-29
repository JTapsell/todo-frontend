import './Todo.css';

import React, { FunctionComponent } from 'react';

interface Props {
  todo: { value: String; checked: Boolean };
  index: Number;
  remove: Function;
  toggle: Function;
}

export const TodoItem: FunctionComponent<Props> = (props: Props) => {
  const { todo, index, remove, toggle } = props;
  return (
    <li className='todo-item'>
      <p className={todo.checked && 'is-done'}>{todo.value}</p>
      <button className='todo-button' type='button' onClick={() => toggle(index)}>
        Done?
      </button>
      <button className='todo-button' type='button' onClick={() => remove(index)}>
        Remove
      </button>
    </li>
  );
};
