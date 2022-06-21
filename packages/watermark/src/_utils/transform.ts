// '100px' => 100;
import { isNumber, isString } from './is';

export const transformToNumber = (params: string | number): number => {
  if (isString(params)) {
    return parseFloat(params);
  } else if (isNumber(params)) {
    return params;
  }
};
