import { z } from 'zod';

// get zod object keys recursively
export const getZodKeys = (schema: z.ZodType): string[] => {
  // Adjusted: Signature now uses Zod.ZodType to eliminate null& undefined check
  // check if schema is nullable or optional
  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) {
    return getZodKeys(schema.unwrap());
  }
  // check if schema is an array
  if (schema instanceof z.ZodArray) {
    return getZodKeys(schema.element);
  }
  // check if schema is an object
  if (schema instanceof z.ZodObject) {
    // get key/value pairs from schema
    const entries = Object.entries<Zod.ZodType>(schema.shape); // Adjusted: Uses Zod.ZodType as generic to remove instanceof check. Since .shape returns ZodRawShape which has Zod.ZodType as type for each key.
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
