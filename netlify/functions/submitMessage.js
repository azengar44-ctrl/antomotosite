import { neon } from '@netlify/neon';
import { z } from 'zod';

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200 };
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  try {
    const sql = neon();
    const schema = z.object({
      name: z.string().min(1).max(80),
      email: z.string().email().max(120).optional().nullable(),
      message: z.string().min(5).max(4000),
      source_path: z.string().max(255).optional().nullable(),
      user_id: z.string().uuid().optional().nullable()
    });
    const data = schema.parse(JSON.parse(event.body || '{}'));

    if (data.user_id) {
      await sql`set local app.user_id = ${data.user_id}`;
      await sql`
        insert into public.messages (user_id, name, email, body, source_path)
        values (${data.user_id}::uuid, ${data.name}, ${data.email}, ${data.message}, ${data.source_path || '/'})`;
    } else {
      await sql`
        insert into public.messages (user_id, name, email, body, source_path)
        values (null, ${data.name}, ${data.email}, ${data.message}, ${data.source_path || '/'})`;
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'Bad payload or DB error' }) };
  }
};
