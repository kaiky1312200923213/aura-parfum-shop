import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, fileBase64, contentType, bucket = 'images', folder = 'perfumes' } = req.body;
    
    if (!fileName || !fileBase64 || !contentType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const buffer = Buffer.from(fileBase64, 'base64');
    const uniqueFileName = `${folder}/${Date.now()}-${fileName}`;
    
    const { error } = await supabase.storage
      .from(bucket)
      .upload(uniqueFileName, buffer, { contentType, upsert: true });
    
    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(uniqueFileName);
    
    return res.status(200).json({ url: urlData.publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
}