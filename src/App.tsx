import './App.css';

import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';

import { Login } from './Auth/Login';
import { SignUp } from './Auth/SignUp';
import { AuthContext } from './context/AuthContext';
import { AddTodo } from './Todo/AddTodo';
import { TodoItem } from './Todo/TodoItem';
import { TodoList } from './Todo/TodoList';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback(uid => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/sign-up'>
          <SignUp />
        </Route>
        <Route path='/todos'>
          <TodoList />
        </Route>
        <Route path='/add-todo'>
          <AddTodo />
        </Route>
        <Route path='/todo/:todoId'>
          <TodoItem />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/sign-up'>
          <SignUp />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider value={{ loggedIn: isLoggedIn, userId, login, logout }}>
      <div className='App'>
        <Router>
          <Link to='/login'>Login</Link>
          <Link to='/sign-up'>Sign Up</Link>
          {isLoggedIn && (
            <>
              <Link to='/todos'>Todos</Link>
              <Link to='/add-todo'>Add Todo</Link>
            </>
          )}
          <main>{routes}</main>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};
