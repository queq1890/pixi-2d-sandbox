/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ALLOWED_KEY_TYPE } from './constants';

export interface ControllerState {
  keys: Record<ALLOWED_KEY_TYPE, boolean>;
}

const initialState: ControllerState = {
  keys: {
    right: false,
    left: false,
    up: false,
    down: false,
    space: false,
  },
};

const slice = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    keydown: (state, action: PayloadAction<ALLOWED_KEY_TYPE>) => {
      state.keys[action.payload] = true;
    },
    keyup: (state, action: PayloadAction<ALLOWED_KEY_TYPE>) => {
      state.keys[action.payload] = false;
    },
  },
});

const { reducer, actions } = slice;

export { reducer, actions };
