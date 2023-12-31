const Pool = require('pg').Pool

const pool = new Pool({
  connectionString: 'postgres://default:jLxwp4iZT1tQ@ep-fragrant-wildflower-41793733.eu-central-1.postgres.vercel-storage.com:5432/verceldb' + "?sslmode=require",
})

/* const pool = new Pool( {
  user: 'postgres',
  password: '8453',
  host: 'localhost',
  port: 6000,
  database: 'audio-player'
}) */

pool.connect().catch(e => console.log(e))

module.exports = pool