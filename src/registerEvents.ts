import { resizeApp } from './app';
import { store } from './reducer';
import { isInvalidKey, findKey } from './utils/keyboard';
import { resizeBg, keydownBg, keyupBg } from './components/background';
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
  if (isInvalidKey(event)) return;
  const key = findKey(event);
  if (key) {
    keydownBg(key);
    keydownPlayer(key);

    store.dispatch(controllerActions.keydown(key));
  }
};

const keyup = (event: KeyboardEvent) => {
  if (isInvalidKey(event)) return;
  const key = findKey(event);
  if (key) {
    keyupBg(key);
    keyupPlayer(key);

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
