import './Todo.css';

import React, { FunctionComponent, useRef, useState } from 'react';

import { TodoItem } from './TodoItem';

export const TodoList: FunctionComponent = () => {
  const [todoList, setTodoList] = useState([]);

  const addTodo = useRef<HTMLInputElement | null>(null);

  const addClickHandler = () => {
    const newList = [...todoList, { value: addTodo.current.value, checked: false }];
    setTodoList(newList);
  };

  const removeClickHandler = idx => {
    todoList.splice(idx, 1);
    setTodoList([...todoList]);
  };

  const toggleClickHandler = idx => {
    todoList[idx].checked = !todoList[idx].checked;
    setTodoList([...todoList]);
  };

  return (
    <div>
      <input ref={addTodo} placeholder='Add Todo' />
      <button type='button' onClick={addClickHandler}>
        Add
      </button>
      <ul className='todo-list'>
        {todoList.map((todo: any, i: number) => {
          return <TodoItem todo={todo} index={i} remove={removeClickHandler} toggle={toggleClickHandler} />;
        })}
      </ul>
    </div>
  );
};
