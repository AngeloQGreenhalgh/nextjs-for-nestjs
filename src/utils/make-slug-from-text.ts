import slugify from 'slugify';
import { makeRandoString } from './make-random-string';

export const makeSlugFromText = (text: string) => {
  const slug = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });

  return `${slug}-${makeRandoString()}`;
};
