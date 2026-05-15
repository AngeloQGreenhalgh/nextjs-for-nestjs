import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/db/drizzle';
import { postTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';
import { asyncDelay } from '@/utils/async-delay';

// Acessando a variável de ambiente
const simulateWaitMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(simulateWaitMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (post, { eq }) => eq(post.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(simulateWaitMs, true);
    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq, and }) =>
        and(eq(post.slug, slug), eq(post.published, true)),
    });

    if (!post) {
      throw new Error('Post não encontrado para slug');
    }
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(simulateWaitMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }
  async findById(id: string): Promise<PostModel> {
    await asyncDelay(simulateWaitMs, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!post) {
      throw new Error('Post não encontrado para ID');
    }
    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists) {
      throw new Error('Post com ID ou Slug já existe na base de dados');
    }

    await drizzleDb.insert(postTable).values(post);
    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error('Post não existe');
    }

    const updatedAt = new Date().toISOString();

    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };

    await drizzleDb.update(postTable).set(postData).where(eq(postTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }
  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error('Post não existe');
    }

    await drizzleDb.delete(postTable).where(eq(postTable.id, id));

    return post;
  }
}
