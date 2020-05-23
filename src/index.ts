/* eslint-disable @typescript-eslint/no-unused-vars */
import 'normalize.css';
import './index.css';
import { Application, TilingSprite, Texture } from 'pixi.js';
import { BG_SIZE } from './constnats';

let bgBack: TilingSprite;
let bgMiddle: TilingSprite;
let bgFront: TilingSprite;

let bgList: TilingSprite[];
let bgX = 0;
let bgSpeed = 1;

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xaaaaaa,
});

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

const updateBg = () => {
  bgX += bgSpeed;
  bgFront.tilePosition.x = bgX;
  bgMiddle.tilePosition.x = bgX / 2;
  bgBack.tilePosition.x = bgX / 4;
};

const gameLoop = () => {
  updateBg();
};

const initLevel = () => {
  bgBack = createBg(app.loader.resources.bgBack.texture);
  bgMiddle = createBg(app.loader.resources.bgMiddle.texture);
  bgFront = createBg(app.loader.resources.bgFront.texture);

  bgList = [bgBack, bgMiddle, bgFront];

  app.ticker.add(gameLoop);
};

// loader settings
app.loader.baseUrl = '../assets';
app.loader
  .add('bgBack', 'back-trees.png')
  .add('bgMiddle', 'middle-trees.png')
  .add('bgFront', 'front-trees.png');

app.loader.onComplete.add(initLevel);
app.loader.load();

const resizeApp = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
};

const resizeBg = () => {
  const scale = getBgScale();

  bgList.forEach((bg) => {
    // eslint-disable-next-line no-param-reassign
    bg.scale = {
      ...bg.scale,
      ...scale,
    };
  });
};

// TODO: create event handler
const resize = () => {
  resizeApp();
  resizeBg();
};

const keydown = (event: KeyboardEvent) => {
  console.log(event.keyCode);
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

window.addEventListener('resize', resize);
window.addEventListener('keydown', keydown);

document.body.append(app.view);
