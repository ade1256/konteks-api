/* eslint-disable strict */

'use strict'

const axios = require('axios')

module.exports = () => {
  return new Promise(async resolve => {
    const url =
      'https://accounts.google.com/o/oauth2/token?refresh_token=1//0ghXfYG147f0TCgYIARAAGBASNwF-L9IrbbUFhHzi5bviwE4yQX3IVltHI6AP6smivF4Klp7zkNcbjoy34YNGycyskaxGBjonll0&grant_type=refresh_token&client_id=674453531566-lmb4jfo8j1f59sst1i2l4tr8nh2m9ohl.apps.googleusercontent.com&client_secret=cHn6sZmu6am6kpKJncakcz1w'
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
