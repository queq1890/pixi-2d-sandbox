import { resizeApp } from './app';
import { resizeBg, keydownBg } from './sprites/background';

const resize = () => {
  resizeApp();
  resizeBg();
};

const keydown = (event: KeyboardEvent) => {
  keydownBg(event);
};

export const registerEvents = () => {
  window.addEventListener('resize', resize);
  window.addEventListener('keydown', keydown);
};
