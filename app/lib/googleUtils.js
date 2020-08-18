const { google } = require('googleapis')

/*******************/
/** CONFIGURATION **/
/*******************/

const googleConfig = {
  clientId:
    '522794430028-25l6diknblkokv3vt8c95271v45902im.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: '0-KdKnqowkPVd67mxdwfLOF2', // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: 'http://localhost:3001/oauth2/callback' // this must match your google api settings
}

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email'
]

/*************/
/** HELPERS **/
/*************/

const createConnection = () => {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  )
}

const getConnectionUrl = auth => {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  })
}

const getGooglePlusApi = auth => {
  return google.plus({ version: 'v1', auth })
}

/**********/
/** MAIN **/
/**********/

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
const urlGoogle = () => {
  const auth = createConnection()
  const url = getConnectionUrl(auth)
  return url
}

/**
 * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
const getGoogleAccountFromCode = async code => {
  const auth = createConnection()
  const data = await auth.getToken(code)
  const tokens = data.tokens
  auth.setCredentials(tokens)
  const plus = getGooglePlusApi(auth)
  const me = await plus.people.get({ userId: 'me' })
  const userGoogleId = me.data.id
  const userGoogleEmail =
    me.data.emails && me.data.emails.length && me.data.emails[0].value
  return {
    id: userGoogleId,
    email: userGoogleEmail,
    tokens
  }
}
