import 'server-only';
import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { ApiRequest, apiRequest } from './api-request';

// Essa parte de requisição funcionará como uma camada única de acesso de
// dados (Data Access Layer) centralizado para aumentar a seguranda
// dodas dados
export async function authenticatedApiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  const jwtToken = await getLoginSessionForApi();

  if (!jwtToken) {
    return {
      success: false,
      errors: ['Usuário não autenticado'],
      status: 401,
    };
  }

  // Aqui torna obrigatório a passagem do token de dados
  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${jwtToken}`,
  };

  return apiRequest<T>(path, {
    ...options,
    headers,
  });
}
