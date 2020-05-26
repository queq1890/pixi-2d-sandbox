import {
  ALLOWED_KEY_VALUE,
  ALLOWED_KEYS,
  ALLOWED_KEY_TYPE,
  KEY_MAP,
} from '../components/controller/constants';

export const isInvalidKey = (event: KeyboardEvent): boolean =>
  !ALLOWED_KEY_VALUE.some((num) => num === event.keyCode);

export const findKey = (event: KeyboardEvent): ALLOWED_KEY_TYPE | undefined =>
  ALLOWED_KEYS.find((k) => KEY_MAP[k] === event.keyCode);
