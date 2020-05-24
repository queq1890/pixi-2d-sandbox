/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BackgroundState {
  x: number;
  speed: number;
}

const initialState: BackgroundState = {
  x: 0,
  speed: 4,
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
  },
});

const { reducer, actions } = slice;

export { reducer, actions };
