/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

type userIdType = string | null;

interface ContextProps {
  loggedIn: Boolean;
  userId: userIdType;
  login: (id: String) => void;
  logout: () => void;
}

export const AuthContext = createContext<Partial<ContextProps>>({
  loggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
