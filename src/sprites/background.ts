import { TilingSprite, Texture } from 'pixi.js';
import { app } from '../app';
import { BG_SIZE } from '../constnats';

// TODO: create domain model for each object
// handle state logic with redux

let bgBack: TilingSprite;
let bgMiddle: TilingSprite;
let bgFront: TilingSprite;

let bgList: TilingSprite[];
let bgX = 0;
let bgSpeed = 1;

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

export const updateBg = () => {
  bgX += bgSpeed;
  bgFront.tilePosition.x = bgX;
  bgMiddle.tilePosition.x = bgX / 2;
  bgBack.tilePosition.x = bgX / 4;
};

export const initBackground = () => {
  bgBack = createBg(app.loader.resources.bgBack.texture);
  bgMiddle = createBg(app.loader.resources.bgMiddle.texture);
  bgFront = createBg(app.loader.resources.bgFront.texture);

  bgList = [bgBack, bgMiddle, bgFront];
};

export const resizeBg = () => {
  const scale = getBgScale();

  bgList.forEach((bg) => {
    // eslint-disable-next-line no-param-reassign
    bg.scale = {
      ...bg.scale,
      ...scale,
    };
  });
};

export const keydownBg = (event: KeyboardEvent) => {
  switch (event.keyCode) {
    case 39: {
      bgSpeed -= 1;
      break;
    }
    case 37: {
      bgSpeed += 1;
      break;
    }

    case 32: {
      bgSpeed = 0;
      break;
    }

    default:
  }
};
