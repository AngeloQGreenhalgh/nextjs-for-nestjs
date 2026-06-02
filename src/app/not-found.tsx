import { ErrorMessage } from '@/Components/ErrorMessager';

export default function NotFoundPage() {
  return (
    <>
      <ErrorMessage
        pageTitle='Página Não Encontrada'
        contentTitle='404'
        content={
          <>
            Erro 404 - A página que você está tentando acessar não existe neste
            site.
          </>
        }
      />
    </>
  );
}
