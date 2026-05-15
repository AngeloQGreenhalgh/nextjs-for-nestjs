import clsx from 'clsx';
import Link from 'next/link';

type PoastHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

export function PoastHeading({
  children,
  url,
  as: Tag = 'h2',
}: PoastHeadingProps) {
  const headingClassMap = {
    h1: 'text-2xl/tight sm:text-4xl font-extrabold',
    h2: 'text-2xl/tight font-bold',
  };

  const commonClasses = '';

  return (
    <Tag className={clsx(headingClassMap[Tag], commonClasses)}>
      <Link className='group-hover:text-slate-600 transition' href={url}>
        {children}
      </Link>
    </Tag>
  );
}
