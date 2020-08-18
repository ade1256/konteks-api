/* eslint-disable strict */

'use strict'

const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async fileId => {
  return new Promise(async resolve => {
    const urlEnd = `https://docs.google.com/viewer?srcid=${fileId}&pid=explorer&efh=true&a=v&chrome=false&embedded=false`

    axios
      .get(urlEnd)
      .then(resp => {
        const result = {
          cookie: resp.headers['set-cookie']
        }
        const $ = cheerio.load(resp.data)
        const text = $($('script')[1]).html()
        const findAndClean = findTextAndReturnRemainder(
          text,
          'window.viewerData ='
        )

        const replacetoString = replaceAll(findAndClean, `'`, `"`)
        // eslint-disable-next-line no-eval
        const jsonObject = eval(`(${replacetoString})`)
        result.sources = jsonObject.itemJson[19][0][18][1]
          .split(',')
          .map(itagAndUrl => {
            const [itag, url] = itagAndUrl.split('|')
            return {
              label: getVideoResolution(itag),
              file: url
            }
          })
          .filter(video => video.label !== 0)

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

// eslint-disable-next-line func-style
function findTextAndReturnRemainder(target, variable) {
  const chopFront = target.substring(
    target.search(variable) + variable.length,
    target.length
  )
  const result = chopFront.substring(0, chopFront.search(';'))
  return result
}

// eslint-disable-next-line func-style
function replaceAll(string, search, replace) {
  return string.split(search).join(replace)
}
