import { Pool } from 'pg';

let conn;

if (!conn) {
    conn = new Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
    });
}

export default conn;
