import fs from 'fs'
import https from 'https'
import fetch from 'node-fetch'
import { PassThrough } from 'stream'
import {
  IPFS_API,
  IPFS_USER,
  IPFS_PASS
} from '../config.js'

// NOTE: This is infura API. Is it the same as standard IPFS API?
export async function pin(req, res, { send }) {
  const pass = new PassThrough()
  req.pipe(pass)
  const ipfs_res = await fetch(`${IPFS_API}/api/v0/add`, {
    body: pass,
    method: 'POST',
    headers: { 
      'Authorization': `Basic ${btoa(IPFS_USER+":"+IPFS_PASS)}`, 
      'Content-Type': req.headers['content-type'],
      'Content-Length': req.headers['content-length']
    }
  })
  if (ipfs_res.status != 200) {
    const text = await ipfs_res.text()
    console.error(text)
    throw new Error('SEH;500;Error on ipfs endpoint')
  }
  const ipfs_json = await ipfs_res.json()
  const ipfs_uri = `ipfs://${ipfs_json.Hash}`
  send(200, ipfs_uri)
}
