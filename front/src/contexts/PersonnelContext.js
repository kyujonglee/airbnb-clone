import React, { useReducer, createContext, useContext } from 'react';

const initState = {
  adult: 0,
  child: 0,
  baby: 0
};

const ADULT_MAX = 16;
const CHILD_MAX = 5;

const increaseAdult = state => {
  const { adult } = state;
  if (adult >= ADULT_MAX) return state;
  return {
    ...state,
    adult: adult + 1
  };
};

const decreaseAdult = state => {
  const { adult, child, baby } = state;
  const isChildAndBaby = () => child !== 0 || baby !== 0;
  if (adult === 1 && isChildAndBaby()) return state;
  return { ...state, adult: adult - 1 };
};

const increaseLittle = (state, name) => {
  const { adult } = state;
  const target = state[name];
  if (target >= CHILD_MAX) return state;
  if (adult === 0) {
    return {
      ...state,
      adult: 1,
      [name]: target + 1
    };
  }
  return {
    ...state,
    [name]: target + 1
  };
};

const decreaseLittle = (state, name) => {
  const target = state[name];
  if (target > 0) {
    return {
      ...state,
      [name]: target - 1
    };
  }
  return state;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE_ADULT':
      return increaseAdult(state);
    case 'DECREASE_ADULT':
      return decreaseAdult(state);
    case 'INCREASE_LITTLE':
      return increaseLittle(state, action.name);
    case 'DECREASE_LITTLE':
      return decreaseLittle(state, action.name);
    case 'RESET':
      return initState;
    default:
      return state;
  }
};

const PersonnelStateContenxt = createContext();
const PersonnelDispatchContext = createContext();

export const PersonnelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <PersonnelDispatchContext.Provider value={dispatch}>
      <PersonnelStateContenxt.Provider value={state}>
        {children}
      </PersonnelStateContenxt.Provider>
    </PersonnelDispatchContext.Provider>
  );
};

export const usePersonnelState = () => {
  const context = useContext(PersonnelStateContenxt);
  if (!context) {
    throw new Error('cannot find Personnel Provider');
  }
  return context;
};

export const usePersonnelDispatch = () => {
  const context = useContext(PersonnelDispatchContext);
  if (!context) {
    throw new Error('cannot find Personnel Provider');
  }
  return context;
};
