import http from 'http'
import { router, method } from 'tiny-http-router'
import { client } from './utils.js'
import { HTTP_PORT } from './config.js'
import { pin as pin_ipfs } from './api/ipfs.js'
import { get_profile } from './api/profile.js'
import { validate_profile } from './api/validate.js'
import './sentry.js'

http.createServer(router({
  '/profile/:address': client(get_profile),
  '/pin/ipfs': method('POST', pin_ipfs),
  '/validate/profile': method('POST', validate_profile)
}, (req, res, { send }) => {
  send(200, 'Tezos Community Profiles API')
}))
.listen(HTTP_PORT, () => {
  console.log(`Listening to ${HTTP_PORT}`)
})
