import fs from 'fs'
import https from 'https'
import fetch from 'node-fetch'
import { PassThrough } from 'stream'
import { FormData } from 'formdata-node'
import {
  IPFS_API,
  IPFS_USER,
  IPFS_PASS
} from './config.js'
import formidable from 'formidable'

// NOTE: This is infura API. Is it the same as standard IPFS API?
export async function pin(req, res, { send }) {
  const pass = new PassThrough()
  req.pipe(pass)
  const form = new FormData()
  form.set('file', pass) 
  const ipfs_res = await fetch(`${IPFS_API}/api/v0/add`, {
    body: form,
    method: 'POST',
    headers: { Authorization: `Basic ${btoa(IPFS_USER+":"+IPFS_PASS)}` }
  })
  if (ipfs_res.status != 200) {
    const text = await ipfs_res.text()
    console.log('her', text)
    throw new Error('SEH;500;Error on ipfs endpoint')
  }
  const ipfs_json = await ipfs_res.json()
  const ipfs_uri = `ipfs://${ipfs_json.Hash}`
  send(200, ipfs_uri)
}
