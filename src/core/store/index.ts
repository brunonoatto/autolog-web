import { useEffect, useState } from 'react';
import type { TListener, TListenerFn, TSetState } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStore = <TState extends Record<string, any>>(
  createState: (setState: TSetState<TState>, getState: () => TState) => TState,
) => {
  let state: TState;
  // eslint-disable-next-line prefer-const
  let listeners: TListener;

  const notifyListener = () => {
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: TListenerFn) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  const setState: TSetState<TState> = (partialState) => {
    const newState = typeof partialState === 'function' ? partialState(state) : partialState;

    state = {
      ...state,
      ...newState,
    };

    notifyListener();
  };

  const getState = () => {
    return state;
  };

  const useStore = <TValue>(selector: (currentState: TState) => TValue): TValue => {
    // quando mudar para o React18, remover a implementação e usar o hook abaixo
    // return useSyncExternalStore(subscribe, ()=>selector(state))

    const [value, setValue] = useState(() => selector(state));

    useEffect(() => {
      const unsubscribe = subscribe(() => {
        const newValue = selector(state);

        if (newValue !== value) setValue(newValue);
      });

      return () => unsubscribe();
    });

    return value;
  };

  state = createState(setState, getState);
  listeners = new Set();

  return useStore;
};

export default createStore;
