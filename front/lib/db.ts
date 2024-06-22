import { Pool } from 'pg';

let conn: Pool = new Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : undefined,
    });

export default conn;
