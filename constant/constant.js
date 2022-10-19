const { config } = require("dotenv")
config()

module.exports = {
  PORT: process.env.PORT || 5000,
  SECRET: process.env.SECRET,
  CLIENT_URL: process.env.CLIENT_URL
}