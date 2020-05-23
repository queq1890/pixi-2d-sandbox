/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Keys = 'right' | 'left' | 'up' | 'down';

interface ControllerState {
  keys: Record<Keys, boolean>;
}

const initialState: ControllerState = {
  keys: {
    right: false,
    left: false,
    up: false,
    down: false,
  },
};

const slice = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    keydown: (state, action: PayloadAction<Keys>) => {
      state.keys[action.payload] = true;
    },
    keyup: (state, action: PayloadAction<Keys>) => {
      state.keys[action.payload] = true;
    },
  },
});

const { reducer, actions } = slice;

export { reducer, actions };
