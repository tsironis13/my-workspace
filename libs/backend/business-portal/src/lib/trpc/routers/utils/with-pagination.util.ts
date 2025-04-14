import { SQL } from 'drizzle-orm';
import { PgSelect, PgColumn } from 'drizzle-orm/pg-core';

export const withPagination = <T extends PgSelect>(
  qb: T,
  orderByColumn: PgColumn | SQL | SQL.Aliased,
  page = 1,
  pageSize = 10
) => {
  return qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
};
