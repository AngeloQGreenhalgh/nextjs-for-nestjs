import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { drizzleDb } from '.';
import { postTable } from './schemas';

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await await jsonPostRepository.findAll();
  console.log(posts);
  try {
    //await drizzleDb.delete(postTable); // Isso limpa a base de dados
    await drizzleDb.insert(postTable).values(posts); // Insere dados na base de dados
    console.log(`${posts.length} posts foram salvos na base de dados.`);
  } catch (error) {
    console.error('Error during seeding:', error);
  }
})();
