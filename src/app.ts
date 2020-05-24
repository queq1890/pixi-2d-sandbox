import { Application } from 'pixi.js';

export const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xaaaaaa,
});

export const resizeApp = (): void => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
};

export const prepareAssets = (): void => {
  app.loader.baseUrl = '../assets';
  app.loader
    .add('bgBack', 'back-trees.png')
    .add('bgMiddle', 'middle-trees.png')
    .add('bgFront', 'front-trees.png')
    .add('playerSheet', 'player-sheet.png');
};
