/* 
  Ensure only 0-9; strips non-digits
*/
export function processNumbersOnlyString(input: string): string {
  if (input == null || Number.isNaN(input)) return '';
  return input.replaceAll(/\D/g, '');
}

export default processNumbersOnlyString;
