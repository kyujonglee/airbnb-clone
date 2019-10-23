import React, { useReducer, createContext, useContext } from 'react';

const initState = {
  checkIn: '',
  checkOut: '',
  priceStart: 0,
  priceEnd: 1000000
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHECK':
      return {
        ...state,
        checkIn: action.checkIn,
        checkOut: action.checkOut
      };
    case 'SET_PRICE':
      return {
        ...state,
        priceStart: action.priceStart,
        priceEnd: action.priceEnd
      };
    default:
      return state;
  }
};

const RoomStateContenxt = createContext();
const RoomDispatchContext = createContext();

export const RoomProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <RoomStateContenxt.Provider value={state}>
      <RoomDispatchContext.Provider value={dispatch}>
        {children}
      </RoomDispatchContext.Provider>
    </RoomStateContenxt.Provider>
  );
};

export const useRoomState = () => {
  const context = useContext(RoomStateContenxt);
  if (!context) {
    throw new Error('cannot find Room Provider');
  }
  return context;
};

export const useRoomDispatch = () => {
  const context = useContext(RoomDispatchContext);
  if (!context) {
    throw new Error('cannot find Room Provider');
  }
  return context;
};
