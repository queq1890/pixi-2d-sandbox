import 'normalize.css';
import './index.css';
import { Application } from 'pixi.js';

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xff00ff,
});

const resize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
};

document.body.append(app.view);
window.addEventListener('resize', resize);
