const { check } = require('express-validator')
const pool = require('../db')
const { compare } = require('bcryptjs')

// check email
const participantEmail = check('email').isEmail().withMessage("please provide valid email")

// login check
const loginCheck = check('email').custom(async (value, {req}) => {
  const user = await pool.query('SELECT * FROM participant WHERE email = $1', [value])

  if (!user.rows.length){
    throw new Error ('wrong email or password')
  }

  const validPassword = await compare(req.body.password, user.rows[0].password)

  if(!validPassword){
    throw new Error ('wrong email or password')
  }

  req.user = user.rows[0]
})

module.exports = {
  registerParticipant: [participantEmail],
  loginParticipant: [loginCheck]
}