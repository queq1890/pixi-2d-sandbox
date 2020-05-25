/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LastKeyboardEvent } from '../../types';

type WalikinStatus = 'idle' | 'walk';

export interface PlayerState {
  x: number;
  y: number;
  speed: number;
  walkingStatus: WalikinStatus;
  lastKeyboardEvent: LastKeyboardEvent;
}

const initialState: PlayerState = {
  x: 0,
  y: 0,
  speed: 1,
  walkingStatus: 'idle',
  lastKeyboardEvent: null,
};

const slice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    incrementX: (state) => {
      state.x += state.speed;
    },
    decrementX: (state) => {
      state.x -= state.speed;
    },
    incrementSpeed: (state) => {
      state.speed += 1;
    },
    decrementSpeed: (state) => {
      state.speed -= 1;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    setX: (state, action: PayloadAction<number>) => {
      state.x = action.payload;
    },
    setY: (state, action: PayloadAction<number>) => {
      state.y = action.payload;
    },
    setWalkingStatus: (state, action: PayloadAction<WalikinStatus>) => {
      state.walkingStatus = action.payload;
    },
    setLastKeyboardEvent: (state, action: PayloadAction<LastKeyboardEvent>) => {
      state.lastKeyboardEvent = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export { reducer, actions };
