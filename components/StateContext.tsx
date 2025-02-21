import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  photos: [],
  layouts: {},
  actionsHistory: [],
  currentActionIndex: -1,
};

const StateContext = createContext(initialState);

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PHOTO':
      return {
        ...state,
        photos: [...state.photos, action.payload],
        actionsHistory: [...state.actionsHistory, action],
        currentActionIndex: state.currentActionIndex + 1,
      };
    case 'UNDO_ACTION':
      if (state.currentActionIndex === 0) return state;
      return {
        ...state,
        currentActionIndex: state.currentActionIndex - 1,
      };
    case 'REDO_ACTION':
      if (state.currentActionIndex === state.actionsHistory.length - 1) return state;
      return {
        ...state,
        currentActionIndex: state.currentActionIndex + 1,
      };
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export { StateContext };