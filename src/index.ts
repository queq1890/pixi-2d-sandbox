/* eslint-disable @typescript-eslint/no-unused-vars */
import 'normalize.css';
import './index.css';
import { app } from './app';
import {
  updateBg,
  initBackground,
  resizeBg,
  handleKeydown,
} from './sprites/background';

// TODO: create domain model for each object
// handle state logic with redux

const gameLoop = () => {
  updateBg();
};

const init = () => {
  initBackground();
  app.ticker.add(gameLoop);
};

// loader settings
app.loader.baseUrl = '../assets';
app.loader
  .add('bgBack', 'back-trees.png')
  .add('bgMiddle', 'middle-trees.png')
  .add('bgFront', 'front-trees.png');

app.loader.onComplete.add(init);
app.loader.load();

const resizeApp = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
};

// TODO: create event handler
const resize = () => {
  resizeApp();
  resizeBg();
};

const keydown = (event: KeyboardEvent) => {
  handleKeydown(event);
};

window.addEventListener('resize', resize);
window.addEventListener('keydown', keydown);

document.body.append(app.view);
