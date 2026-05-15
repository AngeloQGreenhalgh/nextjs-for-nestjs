//import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { DrizzlePostRepository } from './drizzle-post-repository';

export const postRepository: PostRepository = new DrizzlePostRepository();

// Resolvendo promisses (pegando o resultado delas)
// postRepository.findAll().then(posts => {
//   console.log(posts);
// });

// Ou usando async/await
// (async () => {
//   const posts = await postRepository.findAll();
//   console.log(posts);
// })();

// (async () => {
//   const post = await postRepository.findById(
//     '1b6a5f57-8a19-4933-91f4-1af678464ded',
//   );
//   console.log(post);
// })();

// (async () => {
//   const newPost: PostModel = {
//     id: '9999',
//     title: 'Novo Post',
//     content: 'Conteúdo do novo post',
//     author: 'Autor do novo post',
//     coverImageUrl: 'http://example.com/cover.jpg',
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     excerpt: 'Resumo do novo post',
//     published: true,
//     slug: 'novo-post',
//   };
//   const createdPost = await postRepository.create(newPost);
//   console.log('Post criado:', createdPost);
// })();

// (async () => {
//   const updatedPostData: PostModel = {
//     id: 'd078af6a-4bb0-4439-b56a-f71ec2ed7c73',
//     title: 'Post Atualizado',
//     content: 'Conteúdo atualizado do post',
//     author: 'Autor Atualizado',
//     coverImageUrl: 'http://example.com/cover-updated.jpg',
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     excerpt: 'Resumo atualizado do post',
//     published: false,
//     slug: 'post-atualizado',
//   };
//   const updatedPost = await postRepository.update(
//     'd078af6a-4bb0-4439-b56a-f71ec2ed7c73',
//     updatedPostData,
//   );
//   if (updatedPost) {
//     console.log('Post atualizado:', updatedPost);
//   } else {
//     console.log('Post não encontrado para atualização.');
//   }
// })();

// (async () => {
//   const deleteResult = await postRepository.delete(
//     'a43ae773-7d2b-4c95-bba0-0379b52cf688',
//   );
//   if (deleteResult) {
//     console.log('Post removido com sucesso.');
//   } else {
//     console.log('Post não encontrado para remoção.');
//   }
// })();

// (async () => {
//   const posts = await postRepository.findAllPublic();
//   console.log('Posts públicos encontrados:', posts.length);

//   posts.map(post => {
//     console.log('post: ', post.slug);
//   });
// })();
