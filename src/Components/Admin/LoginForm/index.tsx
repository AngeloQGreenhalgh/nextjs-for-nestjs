'use client';

import { LoginAction } from '@/actions/login/login-action';
import { Button } from '@/Components/Button';
import { InputText } from '@/Components/InputText';
import clsx from 'clsx';
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function LoginForm() {
  const initialState = {
    email: '',
    errors: [],
  };

  const [state, action, isPending] = useActionState(LoginAction, initialState);

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(e => toast.error(e));
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
          type='email'
          name='email'
          LabelText='E-mail'
          placeholder='Seu e-mail'
          disabled={isPending}
          defaultValue={state.email}
          required
        />

        <InputText
          type='password'
          name='password'
          LabelText='Senha'
          placeholder='Sua senha'
          disabled={isPending}
          required
        />

        <Button disabled={isPending} type='submit' className='mt-4'>
          <LogInIcon />
          Entrar
        </Button>
        <p className='text-sm/tight'>
          <Link href='/user/new'>Criar minha conta</Link>
        </p>
      </form>
    </div>
  );
}
