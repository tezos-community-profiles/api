import { validate } from '@tcprofiles/schemas'

export async function validate_profile(req, res, { send, json }) {
  const payload = await json()
  const valid = validate('profile', payload)
  const msg = valid ? 'Valid' : 'Not valid'
  const code = valid ? 200 : 400
  send(code, msg)
}
