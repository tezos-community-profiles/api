import fetch from 'node-fetch'
import FormData from 'form-data'
import {
  IPFS_API,
  IPFS_USER,
  IPFS_PASS
} from './config.js'
import formidable from 'formidable'

// NOTE: This is infura API. Is it the same as standard IPFS API?
export async function pin(req, res, { send }) {
  const form = formidable({})
  let fields
  let files
  try {
    [fields, files] = await form.parse(req)
  } catch(e) {
    throw new Error('SEH;400;Unable to parse file')
  }
  console.log(fields, files)
//  console.log(req.file)
//  const form = new FormData()
//  form.append('file', req.file)
//  const ipfs_res = await fetch(`${IPFS_API}/api/v0/add`, {
//    body: form,
//    method: 'POST',
//    headers: { Authorization: `Basic ${btoa(IPFS_USER+":"+IPFS_PASS)}` }
//  })
//  const ipfs_json = await ipfs_res.json()
//  const ipfs_uri = `ipfs://${ipfs_json.Hash}`
//  send(200, ipfs_uri)
  send(200, 'YOLO')
}
