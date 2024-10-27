import { affiliates } from '$lib/affiliates';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ params }) => {
  const { id } = params;
  
  const affiliate = affiliates.find(a => a.id === id);
  
  if (!affiliate) {
    throw error(404, 'Link not found');
  }
  
  // Aquí puedes agregar lógica adicional, como registro de clics
  
  throw redirect(302, affiliate.url);
};
