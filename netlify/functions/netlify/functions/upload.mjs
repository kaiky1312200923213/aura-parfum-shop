import supabase from './utils/db-client.mjs';
import { jsonResponse, preflightResponse, errorResponse } from './utils/http.mjs';

const MAX_BODY_BYTES = 6 * 1024 * 1024;

export default async function handler(req) {
  if (req.method === 'OPTIONS') return preflightResponse();
  if (req.method !== 'POST') return jsonResponse({ error: 'Metodo nao permitido' }, 405);

  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return jsonResponse({ error: 'Arquivo muito grande (limite de ~6MB para upload via funcao)' }, 413);
    }

    const body = JSON.parse(raw);
    const { fileName, fileBase64, contentType, bucket } = body;

    if (!fileName || !fileBase64 || !contentType) {
      return jsonResponse({ error: 'Campos obrigatorios: fileName, fileBase64, contentType' }, 400);
    }

    const buffer = Buffer.from(fileBase64, 'base64');
    const uniqueFileName = `perfumes/${Date.now()}-${fileName}`;
    const targetBucket = bucket || 'images';

    const { error } = await supabase.storage
      .from(targetBucket)
      .upload(uniqueFileName, buffer, { contentType, upsert: true });
    if (error) throw error;

    const { data: urlData } = supabase.storage.from(targetBucket).getPublicUrl(uniqueFileName);
    return jsonResponse({ url: urlData.publicUrl });
  } catch (err) {
    return errorResponse(err);
  }
}

export const config = {
  path: '/api/upload',
};
