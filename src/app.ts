import { Application } from 'pixi.js';

export const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xaaaaaa,
});

export const resizeApp = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
};

export const prepareAssets = () => {
  app.loader.baseUrl = '../assets';
  app.loader
    .add('bgBack', 'back-trees.png')
    .add('bgMiddle', 'middle-trees.png')
    .add('bgFront', 'front-trees.png');
};
