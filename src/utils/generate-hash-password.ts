import { hashPassword } from '@/lib/login/password-hashing';

(async () => {
  const minhaSenha = ''; // NÃO ESQUECER DE APAGAR SUA SENHA DAQUI
  const hasheDaSuaSenhaEmBase64 = await hashPassword(minhaSenha);
  console.log({ hasheDaSuaSenhaEmBase64 });
})();
