export const BG_SIZE = {
  HEIGHT: 160,
  WIDTH: 272,
};

export const KEY_MAP = {
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
} as const;

// Maybe it's better to move constants/types to each domain object directory
export type ALLOWED_KEY_TYPE = keyof typeof KEY_MAP;
export type ALLOWED_KEY_VALUE_TYPE = typeof KEY_MAP[ALLOWED_KEY_TYPE];
export const ALLOWED_KEY_VALUE = Object.values(KEY_MAP);
export const ALLOWED_KEYS = Object.keys(KEY_MAP) as Array<ALLOWED_KEY_TYPE>;
