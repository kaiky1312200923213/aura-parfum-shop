import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
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
      
      const { data: brands } = await supabase
        .from('perfumes')
        .select('brand');
      
      const uniqueBrands = [...new Set(brands?.map(b => b.brand) || [])].length;
      
      const { data: families } = await supabase
        .from('perfumes')
        .select('olfactory_family');
      
      const familyCount = families?.reduce((acc, f) => {
        if (f.olfactory_family) acc[f.olfactory_family] = (acc[f.olfactory_family] || 0) + 1;
        return acc;
      }, {}) || {};
      
      return res.status(200).json({
        totalPerfumes: totalPerfumes || 0,
        featuredPerfumes: featuredPerfumes || 0,
        inStock: inStock || 0,
        uniqueBrands,
        familyDistribution: familyCount
      });
    }
    
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}