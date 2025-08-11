import { neon } from '@netlify/neon';

export const handler = async (event, context) => {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method not allowed' };

  const user = context.clientContext && context.clientContext.user;
  if (!user) return { statusCode: 401, body: 'Unauthorized' };

  try {
    const sql = neon();
    await sql`set local app.user_id = ${user.sub}`;
    const rows = await sql`
      select id, name, email, body, source_path, created_at
      from public.messages
      where user_id = current_setting('app.user_id')::uuid
      order by created_at desc`;
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rows) };
  } catch (e) {
    return { statusCode: 500, body: 'DB error' };
  }
};
