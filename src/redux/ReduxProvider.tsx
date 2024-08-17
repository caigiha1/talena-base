import { Provider } from 'react-redux';
import { makeStore } from './store';
import { persistStore } from 'redux-persist';
import React from 'react';

persistStore(makeStore); // persist the store

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={makeStore}>{children}</Provider>;
}
