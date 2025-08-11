import { neon } from '@netlify/neon';

export const handler = async () => {
  try {
    const sql = neon();
    const [row] = await sql`select now() as now`;
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true, now: row.now }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'DB error' }) };
  }
};
