import './App.css';

import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';

import { Login } from './Auth/Login';
import { SignUp } from './Auth/SignUp';
import { AuthContext } from './context/AuthContext';
import { TodoItem } from './Todo/TodoItem';
import { TodoList } from './Todo/TodoList';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const login = useCallback((uid, authToken) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setToken(authToken);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setToken('');
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/todos'>
          <TodoList />
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
    <AuthContext.Provider value={{ loggedIn: isLoggedIn, userId, token, login, logout }}>
      <div className='App'>
        <Router>
          {!isLoggedIn && (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/sign-up'>Sign Up</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to='/todos'>Todos</Link>
              <button
                type='button'
                onClick={() => {
                  setIsLoggedIn(false);
                }}
              >
                Logout
              </button>
            </>
          )}
          <main>{routes}</main>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};
