/* eslint-disable strict */

'use strict'

const request = require('request')
const cheerio = require('cheerio')

module.exports = (fileId, token) => {
  return new Promise(async resolve => {
    request.get(
      `https://www.googleapis.com/drive/v2/files/${fileId}?alt=media`,
      {
        auth: {
          bearer: token
        }
      },
      (err, resp, body) => {
        if (err || !resp || resp.statusCode !== 200 || !body) {
          return resolve(null)
        }

        const result = {
          cookie: resp.headers['set-cookie']
        }
        const $ = cheerio.load(body)

        result.url = `https://drive.google.com${$('a#uc-download-link').attr(
          'href'
        )}`

        return resolve(result)
      }
    )
  })
}
