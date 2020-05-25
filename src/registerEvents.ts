import { resizeApp } from './app';
import { store } from './reducer';
import { resizeBg, keydownBg, keyupBg } from './components/background';
import {
  KEY_MAP,
  ALLOWED_KEY_VALUE,
  ALLOWED_KEYS,
} from './components/controller/constants';
import { actions as controllerActions } from './components/controller/reducer';
import { resizePlayer, keydownPlayer, keyupPlayer } from './components/player';

const resize = () => {
  // TODO: optimize resize ratio
  // see http://www.rocketshipgames.com/blogs/tjkopena/2015/09/basic-scaling-animation-and-parallax-in-pixi-js-v3/
  resizeApp();
  resizeBg();
  resizePlayer();
};

const keydown = (event: KeyboardEvent) => {
  if (!ALLOWED_KEY_VALUE.some((num) => num === event.keyCode)) return;
  const key = ALLOWED_KEYS.find((k) => KEY_MAP[k] === event.keyCode);
  if (key) {
    keydownBg(event);
    keydownPlayer(event);

    store.dispatch(controllerActions.keydown(key));
  }
};

const keyup = (event: KeyboardEvent) => {
  if (!ALLOWED_KEY_VALUE.some((num) => num === event.keyCode)) return;
  const key = ALLOWED_KEYS.find((k) => KEY_MAP[k] === event.keyCode);
  if (key) {
    keyupBg(event);
    keyupPlayer(event);

    store.dispatch(controllerActions.keyup(key));
  }
};

// TODO: app.stage.on(key, value);
// export events from each sprite
export const registerEvents = (): void => {
  window.addEventListener('resize', resize);
  window.addEventListener('keydown', keydown);
  window.addEventListener('keyup', keyup);
};
