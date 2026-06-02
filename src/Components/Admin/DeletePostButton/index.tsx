'use client';
import { deletePostAction } from '@/actions/post/delete-post-action';
import { Dialog } from '@/Components/Dialog';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export function DeletePostButton({ id, title }: DeletePostButtonProps) {
  // O useTransition é um hook do React que permite que você
  // marque uma atualização como "transição". Isso é útil para indicar
  // que uma atualização é de baixa prioridade e pode ser adiada para
  // melhorar a experiência do usuário.
  const [isPending, startTransition] = useTransition();

  const [showDialog, setShowDialog] = useState(false);
  async function handleClick() {
    setShowDialog(true);
  }

  async function handleConfirm() {
    toast.dismiss();
    startTransition(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success('Post apagado com sucesso!');
    });
  }

  return (
    <>
      <button
        className={clsx(
          'text-red-500 cursor-pointer transition',
          '[&_svg]:w-4 [&_svg]:h-4',
          'hover:scale-120 text-red-700',
          'disabled:text-slate-600 disabled:cursor-not-allowed',
        )}
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        onClick={handleClick}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title={`Apagar post?`}
          content={`Tem certeza que deseja apagar este post: ${title}`}
          onCancel={() => setShowDialog(false)}
          onConfirm={() => {
            handleConfirm();
          }}
          disabled={isPending}
        />
      )}
    </>
  );
}
