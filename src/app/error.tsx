'use client';

import { ErrorMessage } from '@/Components/ErrorMessager';
import { useEffect } from 'react';

type RootErrorPageProps = {
  error: Error;
  reset?: () => void;
};

export default function RootErrorPage({ error, reset }: RootErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <ErrorMessage
      pageTitle='Internal Server Error'
      contentTitle='500'
      content='Ocorreu um erro do qual nossa aplicação não conseguiu se recuperar. Tente novamente mais tarde.'
    />
  );
}
