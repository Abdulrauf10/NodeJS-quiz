const express = require ('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { PORT, CLIENT_URL } = require('./constant/constant')
const passport = require('passport')
const router = require('./router')

require('./midleware/passportParticipant')

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: CLIENT_URL, credentials: true}))
app.use(passport.initialize())
app.use(router)


app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})