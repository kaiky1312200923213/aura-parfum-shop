import supabase from './utils/db-client.mjs';
import { jsonResponse, preflightResponse, errorResponse } from './utils/http.mjs';

function extractId(req) {
  const url = new URL(req.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const idx = parts.indexOf('perfumes');
  const id = idx !== -1 ? parts[idx + 1] : undefined;
  return id || null;
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return preflightResponse();

  try {
    const id = extractId(req);
    const url = new URL(req.url);

    if (req.method === 'GET' && id) {
      const { data, error } = await supabase.from('perfumes').select('*').eq('id', id).single();
      if (error) throw error;
      if (!data) return jsonResponse({ error: 'Perfume nao encontrado' }, 404);
      return jsonResponse(data);
    }

    if (req.method === 'GET') {
      const params = url.searchParams;
      const family = params.get('family');
      const intensity = params.get('intensity');
      const minPrice = params.get('minPrice');
      const maxPrice = params.get('maxPrice');
      const search = params.get('search');
      const brand = params.get('brand');
      const featured = params.get('featured');

      let query = supabase.from('perfumes').select('*').order('created_at', { ascending: false });
      if (family) query = query.eq('olfactory_family', family);
      if (intensity) query = query.eq('intensity', intensity);
      if (minPrice) query = query.gte('price', parseFloat(minPrice));
      if (maxPrice) query = query.lte('price', parseFloat(maxPrice));
      if (search) query = query.or(`name.ilike.%${search}%,brand.ilike.%${search}%,description.ilike.%${search}%`);
      if (brand) query = query.eq('brand', brand);
      if (featured === 'true') query = query.eq('featured', true);

      const { data, error } = await query;
      if (error) throw error;
      return jsonResponse(data || []);
    }

    if (req.method === 'POST') {
      const body = await req.json();
      const {
        name, brand, description, price, original_price, olfactory_family,
        intensity, top_notes, heart_notes, base_notes, image_url,
        image_url_secondary, stock, featured, story,
      } = body;

      const { data, error } = await supabase
        .from('perfumes')
        .insert({
          name, brand, description, price, original_price, olfactory_family,
          intensity, top_notes, heart_notes, base_notes, image_url,
          image_url_secondary, stock, featured, story,
        })
        .select()
        .single();
      if (error) throw error;
      return jsonResponse(data, 201);
    }

    if (req.method === 'PUT') {
      const body = await req.json();
      const targetId = id || body.id;
      const { id: _omit, ...updates } = body;
      if (!targetId) return jsonResponse({ error: 'id e obrigatorio' }, 400);

      const { data, error } = await supabase
        .from('perfumes')
        .update(updates)
        .eq('id', targetId)
        .select()
        .single();
      if (error) throw error;
      return jsonResponse(data);
    }

    if (req.method === 'DELETE') {
      const targetId = id || (await req.json().catch(() => ({})))?.id;
      if (!targetId) return jsonResponse({ error: 'id e obrigatorio' }, 400);

      const { error } = await supabase.from('perfumes').delete().eq('id', targetId);
      if (error) throw error;
      return jsonResponse({ ok: true });
    }

    return jsonResponse({ error: 'Metodo nao permitido' }, 405);
  } catch (err) {
    return errorResponse(err);
  }
}

export const config = {
  path: ['/api/perfumes', '/api/perfumes/*'],
};
