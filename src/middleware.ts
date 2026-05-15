import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './lib/login/manage-login';

// Valida rotas específicas a Admin
export const config = {
  matcher: '/admin/:path*',
};

// Implementação do Middleware
export async function middleware(request: NextRequest) {
  // Verifica se é a rota de login em admin
  const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login');

  // Verifica se é a rota de admin
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');

  // Verifica se é uma rota do tipo GET
  const isGetRequest = request.method === 'GET';

  // Verifica se é rota admnistrativa e não rota de login
  const shoudBeAuthenticated = isAdminPage && !isLoginPage;

  // Verifica se rota de navegação de usuário autênticado do tipo GET
  const shouldRedirect = shoudBeAuthenticated && isGetRequest;

  // Se a rota é válida prossegue
  if (!shouldRedirect) {
    return NextResponse.next();
  }

  // Verifica se tem cookie e se está autênticado
  const jwtSession = request.cookies.get(
    process.env.LOGIN_COOKIE_NAME || 'loginSession',
  )?.value;

  const isAutenticated = await verifyJwt(jwtSession);

  // Caso não esteja autênticado redireciona para a página de login
  if (!isAutenticated) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
