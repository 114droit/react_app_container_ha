import pg from 'pg';
const { Pool } = pg;
const poolConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10), // parseInt to ensure it's a number -> ENV Vars sind strings
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // close clients after 30 seconds of inactivity
};

const pool = new Pool(poolConfig);
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Verbindung der Pool-Instanz testen
export async function testDbConnection() {
    try {
        const client = await pool.connect();
        console.log('Database connection successful');
        client.release();
    } catch (err) {
        console.error('Database connection error', err);
    }
}
// Beim API-Start aufrufen:
// testDbConnection();

export const query = (text, params) => pool.query(text, params);