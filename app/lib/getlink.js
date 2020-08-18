/* eslint-disable strict */

'use strict'

const axios = require('axios')
const qs = require('querystring')

module.exports = async fileId => {
  return new Promise(async resolve => {
    const urlEnd = `https://drive.google.com/get_video_info?docid=${fileId}`

    axios
      .get(urlEnd)
      .then(resp => {
        const result = {
          cookie: resp.headers['set-cookie']
        }

        const query = qs.parse(resp.data)

        if (query.status !== 'ok') {
          return resolve(null)
        }

        result.sources = query.fmt_stream_map
          .split(',')
          .map(itagAndUrl => {
            const [itag, url] = itagAndUrl.split('|')
            return {
              label: getVideoResolution(itag),
              file: url
            }
          })
          .filter(video => video.label !== 0)

        if (!result.sources.length) {
          return resolve(null)
        }

        return resolve(result)
      })
      .catch(() => {
        return resolve(null)
      })
  })
}

// eslint-disable-next-line func-style
function getVideoResolution(itag) {
  const videoCode = {
    '18': '360p',
    '59': '480p',
    '22': '720p',
    '37': '1080p'
  }

  return videoCode[itag] || 0
}
