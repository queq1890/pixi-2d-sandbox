import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer as controller } from './controller';

export const rootReducer = combineReducers({
  controller,
});

export const store = configureStore({
  reducer: rootReducer,
});
