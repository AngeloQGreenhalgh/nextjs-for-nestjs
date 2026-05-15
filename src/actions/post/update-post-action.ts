'use server';

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from '@/dto/post/dto';
import { verifyLoginSession } from '@/lib/login/manage-login';
import { PostUpdateSchema } from '@/lib/post/validations';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeRandoString } from '@/utils/make-random-string';
import { revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  Success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await verifyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID inválido'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObject = PostUpdateSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Faça login em outra aba antes de salvar.'],
    };
  }

  if (!zodParsedObject.success) {
    const errors = getZodErrorMessages(zodParsedObject.error);
    return {
      errors,
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const validPostData = zodParsedObject.data;
  const newPost = {
    ...validPostData,
  };

  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [e.message],
      };
    }
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts', 'seconds');
  revalidateTag(`post-${post.slug}`, 'seconds');

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    Success: makeRandoString(),
  };
}
