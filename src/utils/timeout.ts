import { Thousand } from './constants';

async function timeout(ms = Thousand): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export default timeout;
