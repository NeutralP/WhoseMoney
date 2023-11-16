import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { default as objUtils } from './objUtils';
export { default as authFieldsCheck } from './authFieldsCheck';
export { default as stringUtils } from './stringUtils';
export { default as colorConverters } from './colorConverters';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
