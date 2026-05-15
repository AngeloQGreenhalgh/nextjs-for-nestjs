```
  Rotas estáticas, trabalhamos com cache, rotas dinâmicas, não trabalhamos com cache, a caso que podemos trabalhar como ambos.

    Sendo assim, temos dois conceitos envolvidos:

  - SSR (Server Side Rendering)
    Temos páginas, componentes e funções sendo renderizadas do lado do servidor, ou seja, conteúdo dinâmico.

  - CSR (Cliente Side Rendering)
    Temos páginas e funções sendo renderizadas do lado do cliente, significa que são conteúdos estáticos.

Em termos de rotas, temos as seguintes:

Rotas Estáticas (Static Routes) -> São páginas do tipo SSG (Static Site Generation), representam páginas em HTML puro, sem processamento, conteúdo fixo com HTML pronto, não atualiza, geralmente essas páginas ficam em cache.

Rotas Dinâmicas (Dynamic Routes) -> Significa que são páginas em contantes atualizações, nesse caso, uma página HTM, ou parte dela, será renderizada no servidor, aceitando atualização de conteúdo. Sites com esse tipo de comportamento, aceitam carregamento de dados de uma base de dados externa, aceita autenticação de usuário, processamento de dados, pode ocorrer conteúdos estáticos e dinâmicos neste tipo de rota. Quando o conteúdo é alterado parcialmente em uma página dinâmica é denominado ISR (Incremental Static Regeneration)

Exemplificação para entender esse ciclo:

1. Realização da build de uma página
2. Armazenamento dessa página em cache
3. Disponibilização desse página ao cliente - Static (SSG)
4. Requisição de alteração de dados pelo cliente
5. Solicitação chega ao servidor e retorna novos dados
6. Página e renderizada no servidor com novas informações (SCR) e armazenada novamente em cache (SSG) retornada ao cliente aonde é processada pelo navegador (CSR)

Em outras palavras:

Rota (/) -> Rota estática por um breve período de tempo, em seguida sofre atualização de conteúdo, está página terá o conteúdo atualizado em um tempo específico, voltando a ficar estática com os dados em cache (menor atualização)

Rota(/) -> Rota estática até que algum conteúdo seja atualizado, ocorrendo uma validação de cache pelo servidor (atualização constante em um curto espaço de tempo)


Tipos de rotas que temos em nossa site

/ (pública) = página constantemente carregada do cache.
/post/[slug] (pública) = Embora ocorra troca de conteúdo, este já fica em cache.

-- Rotas que executaram CRUD
/admin/post (privada = rota dinâmica) => Lista os posts (R - Read) / Excluir posts (D - Delete)
/admin/post/[id] (privada = rota dinâmica) => Atualizar um post (U - Update)
/admin/post/new] (privada = rota dinâmica) => Criar um post (C - Create)

/admin/login (Rota pública e dinâmica) => Fazer o login do usuário

```
