import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';
import { PublicUserSchema } from '../user/schemas';

// Schemas criados com o zod, um schema funciona como um objeto tipo
// 'DTO', porém ao infés de ser um objeto apático, possui comportamento
// Exemplo, validação de dados
const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Título deve ter, no mínimo, 3 caracteres')
    .max(120, 'Título deve ter um máximo de 120 caracteres'),
  content: z
    .string()
    .trim()
    .min(3, 'Conteúdo é obrigatório')
    .transform(val => sanitizeHtml(val)),
  author: z
    .string()
    .trim()
    .min(4, 'Autor precisa de um mínimo de 4 caracteres')
    .max(100, 'Nome do autor não deve ter mais que 100 caracteres'),
  excerpt: z
    .string()
    .trim()
    .min(3, 'Excerto precisa de um mínimo de 3 caracteres')
    .max(200, 'Excerto não deve ter mais que 200 caracteres'),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message: 'URL da capa deve ser uma URL ou caminho para imagem',
  }),
  published: z
    .union([
      z.literal('on'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform(val => val === 'on' || val === 'true' || val === true),
});

// PostCreateSchema: igual ao base por enquanto
export const PostCreateSchema = PostBaseSchema;

// PostUpdateSchema: pode incluir campos extras no futuro (ex: id)
export const PostUpdateSchema = PostBaseSchema.extend({
  // id: z.string().uuid('ID inválido'),
});

export const CreatePostForApiSchema = PostBaseSchema.omit({
  author: true,
  published: true,
}).extend({});

export const UpdatePostForApiSchema = PostBaseSchema.omit({
  author: true,
}).extend({});

export const PublicPostForApiSchema = PostBaseSchema.extend({
  id: z.string().default(''),
  slug: z.string().default(''),
  title: z.string().default(''),
  excerpt: z.string().default(''),
  author: PublicUserSchema.optional().default({
    id: '',
    email: '',
    name: '',
  }),
  content: z.string().default(''),
  coverImageUrl: z.string().default(''),
  createdAt: z.string().default(''),
});

export type CreatePostForApiDto = z.infer<typeof CreatePostForApiSchema>;
export type UpdatePostForApiDto = z.infer<typeof UpdatePostForApiSchema>;
export type PublicPostForApiDto = z.infer<typeof PublicPostForApiSchema>;

// console.log(
//   PublicPostSchemaForApi.parse({
//     id: '80775244-0453-406e-86b3-79af1943806a',
//   }),
// );

// const obj = {
//   id: 'afa086e4-53e4-492d-acf2-7c2966d83fcd',
//   slug: 'dicas-para-manter-a-saude-mental-em-dia',
//   author: 'Marina Duarte',
//   title: '',
//   excerpt:
//     'Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.',
//   content:
//     'Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.',
//   file: {
//     size: 0,
//     type: 'application/octet-stream',
//     name: 'blob',
//     lastModified: 1773055399290,
//   },
//   coverImageUrl: 'images/bryen_6.png',
//   published: 'on',
// };

// const zodParsedobject = PostBaseSchema.safeParse(obj);

// if (!zodParsedobject.success) {
//   const errors = getZodErrorMessages(zodParsedobject.error);
//   console.log(errors);
// } else {
//   console.log(zodParsedobject);
// }
