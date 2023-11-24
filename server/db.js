const Pool = require('pg').Pool
const pool = new Pool( {
  user: 'postgres',
  password: '8453',
  host: 'localhost',
  port: 6000,
  database: 'audio-player'
})

module.exports = pool