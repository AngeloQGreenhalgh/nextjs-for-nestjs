import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return Buffer.from(hash).toString('base64');
}

export async function VerifyPassword(password: string, base64Hash: string) {
  const hash = Buffer.from(base64Hash, 'base64').toString('utf-8');

  return await bcrypt.compare(password, hash);
}
