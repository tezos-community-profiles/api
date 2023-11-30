import fs from 'fs'
import fetch from 'node-fetch'
import { FormData } from 'formdata-node'
import {
  IPFS_API,
  IPFS_USER,
  IPFS_PASS
} from './config.js'
import formidable from 'formidable'

// NOTE: This is infura API. Is it the same as standard IPFS API?
export async function pin(req, res, { send }) {
  let form = formidable({})
  let fields, files, file;
  try {
    [fields, files] = await form.parse(req)
  } catch(e) {
    throw new Error('SEH;400;Unable to parse file')
  }
  file = files?.file[0]
  if (!file) throw new Error('SEH;400;No file found') 
  form = new FormData()
  form.set('file', fs.createReadStream(file.filepath))
  const ipfs_res = await fetch(`${IPFS_API}/api/v0/add`, {
    body: form,
    method: 'POST',
    headers: { Authorization: `Basic ${btoa(IPFS_USER+":"+IPFS_PASS)}` }
  })
  if (ipfs_res.status != 200) throw new Error('SEH;500;Error on ipfs endpoint')
  const ipfs_json = await ipfs_res.json()
  const ipfs_uri = `ipfs://${ipfs_json.Hash}`
  send(200, ipfs_uri)
}
