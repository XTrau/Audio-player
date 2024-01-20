const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  password: '8453',
  host: 'localhost',
  port: 6000,
  database: 'audio-player'
})

pool.connect().then(() => {console.log("PostgreSQL Connected...")}).catch(e => console.log(e))

module.exports = pool