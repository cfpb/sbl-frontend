/* 
  RSSD ID from the backend are numbers.
  All values from JS <input>s are strings.
  This fn tries to parse the input value as a number, or returns '' if it fails.
*/
export function processRssdId(input: number | string | null): number | string {
  if (input === null) return '';
  if (typeof input === 'number') return input;
  const asNumber = Number.parseInt(input.replaceAll(/\D/g, ''), 10);
  if (Number.isNaN(asNumber)) return '';
  return asNumber;
}

export default processRssdId;
