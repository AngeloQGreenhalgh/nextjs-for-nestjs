import clsx from 'clsx';
import ReactMarkDown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
type SafeMarkDownProps = {
  markdown: string;
};

export function SafeMarkDown({ markdown }: SafeMarkDownProps) {
  return (
    <div
      className={clsx(
        'prose prose-slate',
        'w-full max-w-none',
        'overflow-hidden',
        'prose-a:transition',
        'prose-a:no-underline',
        'prose-a:text-blue-500',
        'prose-a:hover:text-blue-700',
        'prose-a:hover:underline',
        'prose-img:mx-auto',
        'md:prose-lg',
      )}
    >
      <ReactMarkDown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return '';
            return (
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[600px]' {...props} />
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkDown>
    </div>
  );
}
/*
Aqui podemos notar a estilização de componente table dentro de react-markdown.
Isso é feito para garantir que tabelas grandes sejam roláveis horizontalmente,
melhorando a usabilidade em dispositivos com telas menores.
*/
