import { Pool, QueryResult, QueryResultRow } from "pg";

declare global {
  var __pgPool: Pool | undefined;
}

function getPool(): Pool {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  if (!global.__pgPool) {
    global.__pgPool = new Pool({ connectionString: url });
  }
  return global.__pgPool;
}

export const db = {
  query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: unknown[],
  ): Promise<QueryResult<T>> {
    return getPool().query<T>(text, values);
  },
};
