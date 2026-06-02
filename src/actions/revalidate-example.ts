'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateExampleAction(formData: FormData) {
  const path = formData.get('path') || '';
  console.log('Path to revalidate:', path);
  // revalidatePath(`${path}`);

  //revalidate home
  revalidateTag('posts', 'seconds');

  // revalidate tag single post page
  revalidateTag('post-rotina-matinal-de-pessoas-altamente-eficazes', 'seconds');
}
