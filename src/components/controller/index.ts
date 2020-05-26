import { store } from '../../reducer';
import { actions } from './reducer';
import { ALLOWED_KEY_TYPE } from './constants';

export const keydownController = (key: ALLOWED_KEY_TYPE): void => {
  store.dispatch(actions.keydown(key));
};
export const keyupController = (key: ALLOWED_KEY_TYPE): void => {
  store.dispatch(actions.keyup(key));
};
