import React, { createContext, useReducer } from 'react';
import reduce from './AppReducer';

// Initial State
const initialState = {
  users: []
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reduce, initialState);

  // Actions
  const removeUser = (id) => {
    dispatch({
      type: 'REMOVE_USER',
      payload: id
    })
  }

  return (
    <GlobalContext.Provider value={{
      users: state.users,
      removeUser
    }}>
      {children}
    </GlobalContext.Provider>
  )
}