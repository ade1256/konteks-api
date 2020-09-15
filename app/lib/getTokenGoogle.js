/* eslint-disable strict */

'use strict'

const axios = require('axios')

module.exports = () => {
  return new Promise(async resolve => {
    const url =
      'https://accounts.google.com/o/oauth2/token?refresh_token=1//0gUEHu1GZxuRMCgYIARAAGBASNwF-L9IrpFe_mRhWjltBTlNRZIY9TyZdKVehdNoU0r-cTU8cKvnMkRqWZmOgdmmhwAD3XB8B1tw&grant_type=refresh_token&client_id=439829001690-99q55da2th9ndm8fqoajhkhr0plo05u9.apps.googleusercontent.com&client_secret=5qvEwxDL4d8698IVAugLpcGv'
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
