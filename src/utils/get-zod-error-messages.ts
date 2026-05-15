import { ZodError } from 'zod';

export function getZodErrorMessages(error: ZodError): string[] {
  const formatted = error.format();

  return Object.values(formatted)
    .map(field => (Array.isArray(field) ? field : field?._errors || []))
    .flat()
    .filter(Boolean);
}
