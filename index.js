import http from 'http'
import { router } from 'tiny-http-router'
import { client } from './utils.js'
import { HTTP_PORT } from './config.js'
import { get_profile } from './api/profile.js'
//import './sentry.js'

http.createServer(router({
  '/profile': client(get_profile)
  // POST PIN ipfs
}, (req, res, { send }) => {
  send(200, 'Tezos Community Profiles API')
}))
.listen(HTTP_PORT, () => {
  console.log(`Listening to ${HTTP_PORT}`)
})
