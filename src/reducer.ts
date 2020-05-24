import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer as controller } from './components/controller/reducer';
import { reducer as background } from './components/background/reducer';
import { reducer as player } from './components/player/reducer';

export const rootReducer = combineReducers({
  controller,
  background,
  player,
});

export const store = configureStore({
  reducer: rootReducer,
});
