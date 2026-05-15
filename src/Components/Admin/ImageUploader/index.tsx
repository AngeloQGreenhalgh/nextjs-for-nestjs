'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { Button } from '@/Components/Button';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type ImageUploaderProps = {
  disabled?: boolean;
};

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chamarar a action: 'useTransition'
  // const [<booleano: action executado>, <chamada da action>] = useTransition();

  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState('');

  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handlerChange() {
    toast.dismiss();
    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;

    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl('');
      return;
    }
    const uploadMaxSize =
      Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;
    if (file.size > uploadMaxSize) {
      const readbleMaxSize = (uploadMaxSize / 1024).toFixed(2);
      toast.error(`Imagem muito grande. Max.: ${readbleMaxSize} KB.`);

      fileInput.value = '';
      setImgUrl('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        setImgUrl('');
        return;
      }
      setImgUrl(result.url);
      toast.success('Imagem enviada');
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <Button
        onClick={handleChooseFile}
        type='button'
        className='self-start'
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Enviar uma imagem
      </Button>

      {!!imgUrl && (
        <div className='flex flex-col gap-4 py-4'>
          <p>
            <b>URL: </b> {imgUrl}
          </p>

          {/* eslint-disable-next-line */}
          <img className='rounded-lg' src={imgUrl} />
        </div>
      )}

      <input
        onChange={handlerChange}
        ref={fileInputRef}
        className='hidden'
        name='file'
        type='file'
        accept='image/*'
        disabled={isUploading || disabled}
      />
    </div>
  );
}
