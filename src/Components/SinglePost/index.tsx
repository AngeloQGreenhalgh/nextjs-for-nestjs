import { findPublicPostBySlugCached } from '@/lib/post/queries/public';
import Image from 'next/image';
import { PoastHeading } from '../PoastHeading';
import { PostDate } from '../PostDate';
import { SafeMarkDown } from '../SafeMarkDown';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostBySlugCached(slug);

  return (
    <article className='mb-16'>
      <header className='group flex flex-col gap-4 mb-4'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          width={1200}
          height={200}
          alt={post.title}
        />
        <PoastHeading url={`/post/${post.slug}`}>{post.title}</PoastHeading>
        <p>
          {post.author} | {<PostDate dateTime={post.createdAt} />}
        </p>
      </header>
      <p className='text-xl mb-4 text-slate-600'>{post.excerpt}</p>
      <SafeMarkDown markdown={post.content} />
    </article>
  );
}
