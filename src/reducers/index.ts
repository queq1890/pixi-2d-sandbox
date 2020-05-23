import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer as controller } from './controller';
import { reducer as background } from './background';

export const rootReducer = combineReducers({
  controller,
  background,
});

export const store = configureStore({
  reducer: rootReducer,
});
