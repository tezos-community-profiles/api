export const get_profile = async (req, res, { send, client, address }) => {
  const profile = await client.query(`select data from profiles where address=$1`, [ address ]).then(r => r.rows[0])
  if (!profile) return send(404, 'Profile not found')
  send(200, profile?.data)
}
