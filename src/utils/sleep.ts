// eslint-disable-next-line @typescript-eslint/no-magic-numbers
async function timeout(ms = 3000): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
async function sleep<T>(
  // eslint-disable-next-line @typescript-eslint/default-param-last, @typescript-eslint/no-magic-numbers
  time: number,
  function_: (...arguments__: unknown[]) => Promise<T>,
  ...arguments_: unknown[]
): Promise<T> {
  await timeout(time);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return function_(...arguments_);
}
export { timeout, sleep };
