import { BaseTexture, Texture, Rectangle, AnimatedSprite } from 'pixi.js';
import { app } from '../../app';
import { store } from '../../reducer';
import { actions } from './reducer';
import { PLAYER_SIZE, BUFFER_HEIGHT } from './constants';
import { KEY_MAP } from '../controller/constants';

let player: AnimatedSprite;
let playerSheet: {
  [key in string]: Array<Texture>;
};

const getPlayerRatio = () => {
  const widthRatio = window.innerWidth / (PLAYER_SIZE.WIDTH * 4);
  const heightRatio = window.innerHeight / (PLAYER_SIZE.HEIGHT * 4);

  return Math.min(widthRatio, heightRatio);
};

const createPlayerSheet = (url: string) => {
  const sheet = BaseTexture.from(url);
  const { WIDTH: w, HEIGHT: h } = PLAYER_SIZE;

  playerSheet = {
    idle: [
      new Texture(sheet, new Rectangle(w * 0, h * 0, w, h)),
      new Texture(sheet, new Rectangle(w * 1, h * 0, w, h)),
    ],
    walk: [
      new Texture(sheet, new Rectangle(w * 1, h * 1, w, h)),
      new Texture(sheet, new Rectangle(w * 2, h * 1, w, h)),
      new Texture(sheet, new Rectangle(w * 3, h * 1, w, h)),
      new Texture(sheet, new Rectangle(w * 4, h * 1, w, h)),
      new Texture(sheet, new Rectangle(w * 5, h * 1, w, h)),
      new Texture(sheet, new Rectangle(w * 6, h * 1, w, h)),
    ],
  };

  return playerSheet;
};

export const initPlayer = (): void => {
  const sheet = createPlayerSheet(app.loader.resources.playerSheet.url);
  player = new AnimatedSprite(sheet.idle);
  const ratio = getPlayerRatio();
  const initialX = PLAYER_SIZE.WIDTH * ratio;
  const initialY =
    app.screen.height - PLAYER_SIZE.HEIGHT * ratio - BUFFER_HEIGHT;

  player.animationSpeed = 0.1;
  player.anchor.x = 0.5;
  player.scale = {
    ...player.scale,
    x: ratio,
    y: ratio,
  };
  player.x = initialX;
  player.y = initialY;
  store.dispatch(actions.setX(initialX));
  store.dispatch(actions.setY(initialY));

  app.stage.addChild(player);
  player.play();
};

export const updatePlayer = (): void => {
  const { x, y, direction: nextDirection } = store.getState().player;
  const currentDirection = Math.sign(player.scale.x) === -1 ? 'left' : 'right';
  player.x = x;
  player.y = y;
  if (currentDirection !== nextDirection) player.scale.x *= -1;
};

export const resizePlayer = (): void => {
  const ratio = getPlayerRatio();

  player.scale.x = ratio;
  player.scale.y = ratio;
  store.dispatch(
    actions.setY(app.screen.height - PLAYER_SIZE.HEIGHT * ratio - BUFFER_HEIGHT)
  );
};

export const keyupPlayer = (): void => {
  const { walkingStatus } = store.getState().player;

  if (!player.playing || walkingStatus === 'walk') {
    player.textures = playerSheet.idle;
    player.play();
    store.dispatch(actions.setWalkingStatus('idle'));
  }
};

export const keydownPlayer = (event: KeyboardEvent): void => {
  const { walkingStatus } = store.getState().player;

  switch (event.keyCode) {
    case KEY_MAP.right: {
      if (!player.playing || walkingStatus === 'idle') {
        player.textures = playerSheet.walk;
        player.play();
        store.dispatch(actions.setWalkingStatus('walk'));
      }

      store.dispatch(actions.incrementX());
      break;
    }
    case KEY_MAP.left: {
      if (!player.playing || walkingStatus === 'idle') {
        player.textures = playerSheet.walk;
        player.play();
        store.dispatch(actions.setWalkingStatus('walk'));
      }
      store.dispatch(actions.decrementX());
      break;
    }
    default:
  }
};
