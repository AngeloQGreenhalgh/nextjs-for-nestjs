import { drizzle } from 'drizzle-orm/better-sqlite3';
import { postTable } from './schemas';
import Database from 'better-sqlite3';
import { resolve } from 'path';

const sqleDatabasePath = resolve(process.cwd(), 'db.sqlite3');
const sqleDatabase = new Database(sqleDatabasePath);

sqleDatabase.pragma('journal_mode = DELETE'); // força commit direto no arquivo principal
sqleDatabase.pragma('synchronous = FULL'); // garante persistência imediata no disco

// instancia o drizzle com essa conexão

export const drizzleDb = drizzle(sqleDatabase, {
  schema: { posts: postTable },
  //logger: true,
});
