const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { SECRET } = require('../constant/constant')
const pool = require('../db')

const cookieExtractor = (req) => {
  let token = null

  if (req && req.coookies) token = req.coookies['token']
  return token
}

const option = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor
}

passport.use(
  new Strategy (option, async ({id}, done) => {
    try {
      const { rows } = pool.query('SELECT id, email FROM participant where id = $1', [id])

      if(!rows.length){
        throw new Error ('404 not authorized')
      }

      let user = { id: rows[0].sa_id, email: rows[0].email }

      return await done (null, user)
    } catch (error) {
      console.log(error.message)
      done(null, false)
    }
  })
)