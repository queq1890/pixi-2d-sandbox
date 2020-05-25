import {
  BaseTexture,
  Texture,
  Rectangle,
  AnimatedSprite,
  Ticker,
} from 'pixi.js';
import { app } from '../../app';
import { store } from '../../reducer';
import { PlayerState, actions } from './reducer';
import { PLAYER_SIZE, BUFFER_HEIGHT } from './constants';
import { ControllerState } from '../controller/reducer';
import { KEY_MAP, ALLOWED_KEYS } from '../controller/constants';

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
      new Texture(sheet, new Rectangle(w * 0, h * 0, w, h)),
      new Texture(sheet, new Rectangle(w * 0, h * 0, w, h)),
      new Texture(sheet, new Rectangle(w * 1, h * 0, w, h)),
      new Texture(sheet, new Rectangle(w * 1, h * 0, w, h)),
      new Texture(sheet, new Rectangle(w * 1, h * 0, w, h)),
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

const jump = () => {
  const axis = 'y';
  const direction = -1;
  const gravity = 1;
  const power = 20;
  const jumpAt = player[axis];
  const { jumping } = store.getState().player;
  let time = 0;

  if (jumping) return;

  store.dispatch(actions.jump());

  const tick = (deltaMs: any) => {
    const jumpHeight = (-gravity / 2) * Math.pow(time, 2) + power * time;

    if (jumpHeight < 0) {
      store.dispatch(actions.land());
      Ticker.shared.remove(tick);
      store.dispatch(actions.setY(jumpAt));

      return;
    }

    store.dispatch(actions.setY(jumpAt + jumpHeight * direction));

    time += deltaMs;
  };

  Ticker.shared.add(tick);
};

const handleTextureUpdate = (playerState: PlayerState) => {
  const { lastKeyboardEvent, walkingStatus } = playerState;

  if (lastKeyboardEvent === 'keyup' && walkingStatus === 'walk') {
    player.textures = playerSheet.idle;
    store.dispatch(actions.setWalkingStatus('idle'));
  }

  if (lastKeyboardEvent === 'keydown' && walkingStatus === 'idle') {
    player.textures = playerSheet.walk;
    store.dispatch(actions.setWalkingStatus('walk'));
  }

  if (!player.playing) player.play();
};

const hadnleDirectionUpdate = (controllerState: ControllerState) => {
  const { keys } = controllerState;
  const currentDirection = Math.sign(player.scale.x) === -1 ? 'left' : 'right';

  if (keys.space) {
    jump();
  }
  if (keys.right) {
    store.dispatch(actions.incrementX());
    if (currentDirection === 'left') player.scale.x *= -1;
  } else if (keys.left) {
    store.dispatch(actions.decrementX());
    if (currentDirection === 'right') player.scale.x *= -1;
  }
};

export const updatePlayer = (): void => {
  const { player: playerState, controller: controllerState } = store.getState();
  const { x, y } = playerState;
  hadnleDirectionUpdate(controllerState);
  handleTextureUpdate(playerState);

  player.x = x;
  player.y = y;
};

export const resizePlayer = (): void => {
  const ratio = getPlayerRatio();

  player.scale.x = ratio;
  player.scale.y = ratio;
  store.dispatch(
    actions.setY(app.screen.height - PLAYER_SIZE.HEIGHT * ratio - BUFFER_HEIGHT)
  );
};
export const keyupPlayer = (event: KeyboardEvent): void => {
  const { keys } = store.getState().controller;
  const targetKey = ALLOWED_KEYS.find((k) => KEY_MAP[k] === event.keyCode);
  if (targetKey === 'up' || targetKey === 'down') {
    // TOOD: up down action

    return;
  }
  if (!targetKey) return;

  // TODO: replace targetKeys with keys this guard when implementing up down actions
  const targetKeys = [keys.right, keys.left, keys.space];

  const isOnlyOneKeyPressed =
    Object.values(targetKeys).filter((key) => key).length === 1;

  if (targetKey && keys[targetKey] && isOnlyOneKeyPressed)
    store.dispatch(actions.setLastKeyboardEvent('keyup'));
};

export const keydownPlayer = (event: KeyboardEvent): void => {
  const targetKey = ALLOWED_KEYS.find((k) => KEY_MAP[k] === event.keyCode);
  if (targetKey === 'up' || targetKey === 'down') {
    // TOOD: up down action

    return;
  }

  store.dispatch(actions.setLastKeyboardEvent('keydown'));
};
