import type { ZodType } from 'zod';
import { ZodArray, ZodNullable, ZodObject, ZodOptional } from 'zod';

// get zod object keys recursively
export const getZodKeys = (schema: ZodType): string[] => {
  // Adjusted: Signature now uses Zod.ZodType to eliminate null& undefined check
  // check if schema is nullable or optional
  if (schema instanceof ZodNullable || schema instanceof ZodOptional) {
    // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return getZodKeys(schema.unwrap());
  }
  // check if schema is an array
  if (schema instanceof ZodArray) {
    // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return getZodKeys(schema.element);
  }
  // check if schema is an object
  if (schema instanceof ZodObject) {
    // get key/value pairs from schema
    // Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entries = Object.entries<ZodType>(schema.shape); // Adjusted: Uses Zod.ZodType as generic to remove instanceof check. Since .shape returns ZodRawShape which has Zod.ZodType as type for each key.
    // loop through key/value pairs
    return entries.flatMap(([key, value]) => {
      // get nested keys
      const nested = getZodKeys(value).map(subKey => `${key}.${subKey}`);
      // return nested keys
      return nested.length > 0 ? nested : key;
    });
  }
  // return empty array
  return [];
};

export default getZodKeys;
