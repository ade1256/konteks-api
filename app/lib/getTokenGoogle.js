/* eslint-disable strict */

'use strict'

const axios = require('axios')

module.exports = () => {
  return new Promise(async resolve => {
    const url =
      'https://accounts.google.com/o/oauth2/token?refresh_token=1//0g0_6gxBUyfhJCgYIARAAGBASNwF-L9Ir9mErzDFkDCyTr_id5t2bzrnb2ihAGUgj9GGw9zffDDhUKDfWswl2Pjtyk_2lzw0k4G8&grant_type=refresh_token&client_id=48816532124-vvvqelmji5q44tdbqvn17nqhbevdoglp.apps.googleusercontent.com&client_secret=F593IvOBaPUf5u-vdy0A23XP'
    axios
      .post(url)
      .then(resp => {
        return resolve(resp.data.access_token)
      })
      .catch(() => {
        return resolve(null)
      })
  })
}
