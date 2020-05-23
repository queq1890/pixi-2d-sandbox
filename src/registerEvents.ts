import { resizeApp } from './app';
import { resizeBg } from './sprites/background';
import { KEY_MAP, ALLOWED_KEY_VALUE, ALLOWED_KEYS } from './constnats';

import { actions as controllerActions } from './reducers/controller';
import { store } from './reducers';

const resize = () => {
  resizeApp();
  resizeBg();
};

const keydown = (event: KeyboardEvent) => {
  if (!ALLOWED_KEY_VALUE.some((num) => num === event.keyCode)) return;
  const key = ALLOWED_KEYS.find((k) => KEY_MAP[k] === event.keyCode);
  if (key) store.dispatch(controllerActions.keydown(key));
};

const keyup = (event: KeyboardEvent) => {
  if (!ALLOWED_KEY_VALUE.some((num) => num === event.keyCode)) return;
  const key = ALLOWED_KEYS.find((k) => KEY_MAP[k] === event.keyCode);
  if (key) store.dispatch(controllerActions.keyup(key));
};

export const registerEvents = (): void => {
  window.addEventListener('resize', resize);
  window.addEventListener('keydown', keydown);
  window.addEventListener('keyup', keyup);
};
