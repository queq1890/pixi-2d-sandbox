/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LastKeyboardEvent } from '../../types';

interface BackgroundState {
  x: number;
  speed: number;
  lastKeyboardEvent: LastKeyboardEvent;
}

const initialState: BackgroundState = {
  x: 0,
  speed: 4,
  lastKeyboardEvent: null,
};

const slice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    incrementBgX: (state) => {
      state.x += state.speed;
    },
    decrementBgX: (state) => {
      state.x -= state.speed;
    },
    incrementBgSpeed: (state) => {
      state.speed += 1;
    },
    decrementBgSpeed: (state) => {
      state.speed -= 1;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    setLastKeyboardEvent: (state, action: PayloadAction<LastKeyboardEvent>) => {
      state.lastKeyboardEvent = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export { reducer, actions };
