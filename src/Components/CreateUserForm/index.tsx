'use client';

import clsx from 'clsx';
import { InputText } from '../InputText';
import { Button } from '../Button';
import { UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { createUserAction } from '@/actions/user/create-user-action';
import { PublicUserSchema } from '@/lib/user/schemas';
import { toast } from 'react-toastify';

export function CreateUserForm() {
  const [state, action, isPending] = useActionState(createUserAction, {
    user: PublicUserSchema.parse({}),
    errors: [],
    success: false,
  });

  useEffect(() => {
    toast.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }
  }, [state]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <InputText
          type='text'
          name='name'
          LabelText='Nome'
          placeholder='Seu nome'
          id='name'
          disabled={isPending}
          defaultValue={state.user.name}
          required
        />
        <InputText
          type='email'
          name='email'
          id='email'
          LabelText='E-mail'
          placeholder='Seu e-mail'
          disabled={isPending}
          defaultValue={state.user.email}
          required
        />
        <InputText
          type='password'
          name='password'
          id='password'
          LabelText='Senha'
          placeholder='Sua senha'
          disabled={isPending}
          required
        />
        <InputText
          type='password'
          name='password2'
          id='password2'
          LabelText='Repetir senha'
          placeholder='Sua senha novamente'
          disabled={isPending}
          required
        />
        <Button disabled={isPending} type='submit' className='mt-4'>
          <UserRoundIcon />
          {!isPending && 'Criar conta'}
          {isPending && 'Criando...'}
        </Button>
        <p className='text-sm/tight'>
          <Link href='/login'>Já tem conta? Entrar</Link>
        </p>
      </form>
    </div>
  );
}
