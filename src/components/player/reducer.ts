/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Direction = 'right' | 'left';
type WalikinStatus = 'idle' | 'walk';

interface PlayerState {
  x: number;
  y: number;
  direction: Direction;
  speed: number;
  walkingStatus: WalikinStatus;
}

const initialState: PlayerState = {
  x: 0,
  y: 0,
  direction: 'right',
  speed: 1,
  walkingStatus: 'idle',
};

const slice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    incrementX: (state) => {
      state.x += state.speed;
      state.direction = 'right';
    },
    decrementX: (state) => {
      state.x -= state.speed;
      state.direction = 'left';
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
  },
});

const { reducer, actions } = slice;

export { reducer, actions };
