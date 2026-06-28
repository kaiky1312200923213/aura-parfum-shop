import supabase from './db-client.js';

const SETTINGS_KEY = 'hero_video';

async function getVideoSetting() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', SETTINGS_KEY)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data?.value || null;
}

async function saveVideoSetting(videoUrl) {
  const { error } = await supabase
    .from('site_settings')
    .upsert(
      { key: SETTINGS_KEY, value: videoUrl, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    );

  if (error) throw error;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const videoUrl = await getVideoSetting();
      return res.status(200).json({ videoUrl });
    }

    if (req.method === 'PUT') {
      const { videoUrl } = req.body;
      if (!videoUrl || typeof videoUrl !== 'string') {
        return res.status(400).json({ error: 'URL do vídeo é obrigatória' });
      }
      await saveVideoSetting(videoUrl);
      return res.status(200).json({ videoUrl });
    }

    if (req.method === 'DELETE') {
      await saveVideoSetting('');
      return res.status(200).json({ videoUrl: null });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Site video API error:', err);
    res.status(500).json({ error: err.message });
  }
}
