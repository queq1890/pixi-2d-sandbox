import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer as controller } from './components/controller/reducer';
import { reducer as background } from './components/background/reducer';

export const rootReducer = combineReducers({
  controller,
  background,
});

export const store = configureStore({
  reducer: rootReducer,
});
