import supabase from './utils/db-client.mjs';
import { jsonResponse, preflightResponse, errorResponse } from './utils/http.mjs';

export default async function handler(req) {
  if (req.method === 'OPTIONS') return preflightResponse();
  if (req.method !== 'GET') return jsonResponse({ error: 'Metodo nao permitido' }, 405);

  try {
    const { count: totalPerfumes } = await supabase
      .from('perfumes')
      .select('*', { count: 'exact', head: true });

    const { count: featuredPerfumes } = await supabase
      .from('perfumes')
      .select('*', { count: 'exact', head: true })
      .eq('featured', true);

    const { count: inStock } = await supabase
      .from('perfumes')
      .select('*', { count: 'exact', head: true })
      .gt('stock', 0);

    const { data: brands } = await supabase.from('perfumes').select('brand');
    const uniqueBrands = [...new Set(brands?.map((b) => b.brand) || [])].length;

    const { data: families } = await supabase.from('perfumes').select('olfactory_family');
    const familyCount = (families || []).reduce((acc, f) => {
      if (f.olfactory_family) acc[f.olfactory_family] = (acc[f.olfactory_family] || 0) + 1;
      return acc;
    }, {});

    return jsonResponse({
      totalPerfumes: totalPerfumes || 0,
      featuredPerfumes: featuredPerfumes || 0,
      inStock: inStock || 0,
      uniqueBrands,
      familyDistribution: familyCount,
    });
  } catch (err) {
    return errorResponse(err);
  }
}

export const config = {
  path: '/api/stats',
};
