/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

interface ContextProps {
  loggedIn: Boolean;
  userId: String;
  token: String;
  login: (id: String, authToken: String) => void;
  logout: () => void;
}

export const AuthContext = createContext<Partial<ContextProps>>({
  loggedIn: false,
  userId: '',
  token: '',
  login: () => {},
  logout: () => {},
});
