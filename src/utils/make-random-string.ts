import crypto from 'crypto';

export const makeRandoString = () => {
  // gera um número aleatório grande
  const randomNumber = parseInt(crypto.randomBytes(4).toString('hex'), 16);
  // converte para base 36 e corta
  return randomNumber.toString(36).substring(0, 6);
};
