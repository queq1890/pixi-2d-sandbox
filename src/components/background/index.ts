import { TilingSprite, Texture } from 'pixi.js';
import { app } from '../../app';
import { store } from '../../reducer';
import { actions } from './reducer';
import { BG_SIZE } from './constants';
import { KEY_MAP } from '../controller/constants';

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

export const updateBg = (): void => {
  // uncomment this to auto scroll
  // store.dispatch(actions.incrementBgX());
  const { x } = store.getState().background;

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

export const keydownBg = (event: KeyboardEvent): void => {
  switch (event.keyCode) {
    case KEY_MAP.right: {
      store.dispatch(actions.decrementBgX());
      break;
    }
    case KEY_MAP.left: {
      store.dispatch(actions.incrementBgX());
      break;
    }
    case KEY_MAP.space: {
      // store.dispatch(actions.setSpeed(0));
      break;
    }
    default:
  }
};
