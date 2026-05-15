//import { eq } from 'drizzle-orm';
import { drizzleDb } from '.';
import { postTable } from './schemas';

(async () => {
  // const posts = await drizzleDb.select().from(postTable);
  // console.log('Posts encontrados:', posts.length);
  // posts.map(post => {
  //   console.log(post.slug);
  // });
  // await drizzleDb.update(postTable)
  // .set({ title: '1 Rotina matinal de pessoas altamente eficazes',
  //        published: true })
  // .where(eq(postTable.slug, 'rotina-matinal-de-pessoas-altamente-eficazes'));
})();
