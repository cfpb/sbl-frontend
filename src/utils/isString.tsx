export const isString = (item: JSX.Element | string): item is string => {
  return typeof item === 'string';
};

export default isString;
