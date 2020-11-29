import './App.css';

import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { Login } from './Auth/Login';
import { SignUp } from './Auth/SignUp';
import { TodoList } from './Todo/TodoList';

export const App = () => {
  return (
    <Router>
      <Switch>
        <div className='App'>
          <Link to='/login'>Login</Link>
          <Link to='/sign-up'>Sign Up</Link>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/sign-up'>
            <SignUp />
          </Route>
          <Route path='/todos'>
            <TodoList />
          </Route>
        </div>
      </Switch>
    </Router>
  );
};
