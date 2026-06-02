import { formatDistanceToNow, formatDateTime } from '@/utils/format-datetime';
import { PoastHeading } from '../PoastHeading';
import { PostDate } from '../PostDate';

type PostSummaryProps = {
  postHeading: 'h1' | 'h2';
  postLink: string;
  createdAt: string;
  title: string;
  excerpt: string;
};

export function PostSummary({
  postHeading,
  postLink,
  createdAt,
  title,
  excerpt,
}: PostSummaryProps) {
  return (
    <div className='flex flex-col gap-4 sm:justify-center'>
      <PostDate dateTime={createdAt} />
      <PoastHeading as={postHeading} url={postLink}>
        {title}
      </PoastHeading>
      <p>{excerpt}</p>
    </div>
  );
}
