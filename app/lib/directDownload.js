/* eslint-disable max-statements */
/* eslint-disable no-unused-vars */
/* eslint-disable no-throw-literal */
/* eslint-disable strict */

'use strict'

/**
 * Module exports.
 * @public
 */

const got = require('got')
const cheerio = require('cheerio')
const cookie = require('cookie')
const setCookie = require('set-cookie-parser')
const URL = require('url')

/**
 * Get the media link (video url and thumb url) of the given google drive document id.
 * @param {string} docId
 * @returns
 */

const createFailedResponse = (status, error) => {
  return {
    satusCode: status,
    error
  }
}

const createSuccessResponse = (videoSource, thumbSource) => {
  // return {
  //   src: videoSource,
  //   thumbnail: thumbSource
  // }
  return videoSource
}

const getMediaLink = async (docId, token) => {
  try {
    const reqThumbnail = got
      .get(`https://drive.google.com/thumbnail?sz=w320&id=${docId}`, {
        followRedirect: false
      })
      .catch(x => {
        return null
      })
    const reqMedia = await got
      .get(`https://drive.google.com/uc?id=${docId}&export=download`, {
        followRedirect: false,
        headers: {
          // Authorization: `Bearer `+token
        }
      })
      .catch(x => {
        // if(x.statusCode && x.statusCode===404) return createFailedResponse(2, 'No resource found');
        // return createFailedResponse(100, 'Unknown error');
        return createFailedResponse(x.statusCode, x.message)
      })
    if (reqMedia.statusCode === 200) {
      // we got something to work on.
    } else if (reqMedia.statusCode === 302) {
      const u = URL.parse(reqMedia.headers.location)
      if (u.hostname.endsWith('googleusercontent.com')) {
        return createSuccessResponse(reqMedia.headers.location, null)
      }
      // redirect occurs, possibly media not shared.
      return createFailedResponse(401, 'Unauthorized')
    } else {
      return reqMedia
    }
    const responseCookies = setCookie.parse(reqMedia.headers['set-cookie'])
    const nextRequestCookies = responseCookies
      .filter(x => x.domain === '.drive.google.com')
      .map(x => {
        return cookie.serialize(x.name, x.value)
      })
      .join(';')

    const $ = cheerio.load(reqMedia.body)
    const downloadLink = $('#uc-download-link').attr('href')
    const reqMediaConfirm = await got
      .get(`https://drive.google.com${downloadLink}`, {
        headers: {
          // Authorization: `Bearer `+token,
          cookie: nextRequestCookies
        },
        followRedirect: false
      })
      .catch((err) => {
        return err
      })
    const videoSource = reqMediaConfirm.headers.location
    const thumbResponse = await reqThumbnail
    const thumbSource =
      (thumbResponse &&
        thumbResponse.headers &&
        thumbResponse.headers.location) ||
      ''
    return createSuccessResponse(videoSource, thumbSource)
  } catch (error) {
    // return `Error while fetching the media link.${error}`
    return null
  }
}

exports.getMediaLink = getMediaLink
