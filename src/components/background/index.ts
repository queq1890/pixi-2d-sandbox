import { TilingSprite, Texture } from 'pixi.js';
import { app } from '../../app';
import { store } from '../../reducer';
import { actions } from './reducer';
import { BG_SIZE } from './constants';
import { KEY_MAP, ALLOWED_KEYS } from '../controller/constants';
import { ControllerState } from '../controller/reducer';

// TODO: stop using let

let bgBack: TilingSprite;
let bgMiddle: TilingSprite;
let bgFront: TilingSprite;

let bgList: TilingSprite[];

const getBgScale = () => {
  return {
    x: window.innerWidth / BG_SIZE.WIDTH,
    y: window.innerHeight / BG_SIZE.HEIGHT,
  };
};

const createBg = (texture: Texture) => {
  const tiling = new TilingSprite(
    texture,
    window.innerWidth,
    window.innerHeight
  );
  tiling.position.set(0, 0);

  const scale = getBgScale();

  tiling.scale = {
    ...tiling.scale,
    ...scale,
  };
  app.stage.addChild(tiling);

  return tiling;
};

const hadnleDirectionUpdate = (controllerState: ControllerState) => {
  const { keys } = controllerState;

  if (keys.right) {
    store.dispatch(actions.decrementBgX());
  } else if (keys.left) {
    store.dispatch(actions.incrementBgX());
  }
};

export const updateBg = (): void => {
  const { controller, background } = store.getState();
  const { x } = background;
  hadnleDirectionUpdate(controller);

  bgFront.tilePosition.x = x;
  bgMiddle.tilePosition.x = x / 2;
  bgBack.tilePosition.x = x / 4;
};

export const initBackground = (): void => {
  bgBack = createBg(app.loader.resources.bgBack.texture);
  bgMiddle = createBg(app.loader.resources.bgMiddle.texture);
  bgFront = createBg(app.loader.resources.bgFront.texture);

  bgList = [bgBack, bgMiddle, bgFront];
};

export const resizeBg = (): void => {
  const scale = getBgScale();

  bgList.forEach((bg) => {
    // eslint-disable-next-line no-param-reassign
    bg.scale = {
      ...bg.scale,
      ...scale,
    };
  });
};

export const keyupBg = (event: KeyboardEvent): void => {
  const { keys } = store.getState().controller;
  const targetKey = ALLOWED_KEYS.find((k) => KEY_MAP[k] === event.keyCode);
  if (targetKey === 'space') {
    // TOOD: implement space action

    return;
  }

  if (targetKey && keys[targetKey])
    store.dispatch(actions.setLastKeyboardEvent('keyup'));
};

export const keydownBg = (event: KeyboardEvent): void => {
  const targetKey = ALLOWED_KEYS.find((k) => KEY_MAP[k] === event.keyCode);
  if (targetKey === 'space') {
    // TOOD: implement space action

    return;
  }

  store.dispatch(actions.setLastKeyboardEvent('keydown'));
};
