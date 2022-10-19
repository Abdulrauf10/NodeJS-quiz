const { hash } = require("bcryptjs")
const { sign } = require("jsonwebtoken")
const pool = require("../db")
const { SECRET } = require('../constant/constant')

module.exports = {
  registerDataParticipant: async (req, res) => {
    const {
      name,
      email,
      password,
    } = req.body
    try {
      const hashedPassword = await hash(password, 10)

      const insertDataParticipant = await pool.query('INSERT INTO participant (name, email, password, whatsapp, company, user_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, email, hashedPassword])

      return res.status(200).json(insertDataParticipant.rows[0])
    } catch (error) {
      return res.status(400).json(error.message)
    }
  },
  loginDataParticipant: async (req, res) => {
    let user= req.user

    let payload= {
      id: user.id,
      email: user.email
    }

    try {
      const token = await sign(payload, SECRET)

      return res.status(200).cookie('token', token).json({
        success: true,
        message: 'log in success'
      })
    } catch (error) {
      return res.status(400).json(error.message)
    }
  },
  getParticipant: async (req, res) => {
    try {
      const getData = await pool.query('SELECT id, email FROM participant')

      return res.status(200).json(getData.rows)
    } catch (error) {
      return res.status(400).json(error.message)
    }
  },
  protectedParticipant: async (req, res) => {
    try {
      return res.status(200).json({
        info: 'protected info',
      })
    } catch (error) {
      return res.status(404).json(error.message)
      }
  },
  getQuestionAndChoices: async (req, res) => {
    try {
      const getAllData = await pool.query('SELECT q_id, question, question_type, ARRAY_AGG(choice) AS choice, ARRAY_AGG(is_correct) AS is_correct FROM questions JOIN choices ON questions.q_id = choices.question_id GROUP BY q_id, question, question_type ORDER BY q_id, question, question_type')

      return res.status(200).json(getAllData.rows)
    } catch (error) {
      return res.status(400).json(error.message)
    }
  },
  postParticipantAnswer: async (req, res) => {
    const {
        participant_id,
        question_id,
        answer1,
        answer2
      } = req.body
    try {
      const insertAnswer = await pool.query('INSERT into participant_answer (participant_id, question_id, answer1, answer2) VALUES ($1, $2, $3, $4) RETURNING *', [participant_id, question_id, answer1, answer2]) 

      return res.status(200).json(insertAnswer.rows[0])
    } catch (error) {
      return res.status(404).json(error.message)
    }
  },
  getAnswerParticipant: async (req, res) => {
    try {
      const getAllData = await pool.query('SELECT * from participant JOIN participant_answer on participant.p_id = participant_answer.participant_id JOIN questions ON participant_answer.question_id = questions.q_id')

      return res.status(200).json(getAllData)
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }
}