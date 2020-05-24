/* eslint-disable @typescript-eslint/no-unused-vars */
import 'normalize.css';
import './index.css';
import { app, resizeApp, prepareAssets } from './app';
import { registerEvents } from './registerEvents';
import { updateBg, initBackground } from './components/background';
import { initPlayer, updatePlayer } from './components/player';

// TODO: create domain model for each object
// handle state logic with redux

const gameLoop = () => {
  updateBg();
  updatePlayer();
};

const init = () => {
  initBackground();
  initPlayer();
  app.ticker.add(gameLoop);
};

prepareAssets();

app.loader.onComplete.add(init);
app.loader.load();

registerEvents();
document.body.append(app.view);
