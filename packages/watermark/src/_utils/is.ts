const opt = Object.prototype.toString;

export function isString(obj: unknown): obj is string {
  return opt.call(obj) === '[object String]';
}

export function isNumber(obj: any): obj is Number {
  return opt.call(obj) === '[object Number]' && obj === obj; // eslint-disable-line
}

export function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}
