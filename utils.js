import pg from 'pg'
import {
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASS,
  PG_NAME
} from './config.js'

export function get_client() {
  return new pg.Client({
    host     : PG_HOST, 
    port     : PG_PORT, 
    user     : PG_USER,
    password : PG_PASS,
    database : PG_NAME
  })
}

export function client(fn) {
  return async function(req, res, opts) {
    const client = get_client()
    await client.connect()
    opts.client = client
    try {
      await fn(req, res, opts)
      await client.end()
    } catch(e) {
      await client.end()
      throw e
    }
  }
}
