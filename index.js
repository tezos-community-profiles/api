import http from 'http'
import { router, method } from 'tiny-http-router'
import { client } from './utils.js'
import { HTTP_PORT } from './config.js'
import { pin as pin_ipfs } from './ipfs.js'
import { get_profile } from './api/profile.js'
//import './sentry.js'

http.createServer(router({
  '/profile/:address': client(get_profile),
  '/pin/ipfs': method('POST', pin_ipfs)
  // TODO: /validate/profile <- validate fields?
}, (req, res, { send }) => {
  send(200, 'Tezos Community Profiles API')
}))
.listen(HTTP_PORT, () => {
  console.log(`Listening to ${HTTP_PORT}`)
})
