import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { family, intensity, minPrice, maxPrice, search, brand, featured } = req.query;
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
      return res.status(200).json(data);
    }
    
    if (req.method === 'POST') {
      const { name, brand, description, price, original_price, olfactory_family, intensity, top_notes, heart_notes, base_notes, image_url, image_url_secondary, stock, featured, story } = req.body;
      const { data, error } = await supabase
        .from('perfumes')
        .insert({ name, brand, description, price, original_price, olfactory_family, intensity, top_notes, heart_notes, base_notes, image_url, image_url_secondary, stock, featured, story })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    
    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const { data, error } = await supabase
        .from('perfumes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return res.status(200).json(data);
    }
    
    if (req.method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase
        .from('perfumes')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }
    
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}