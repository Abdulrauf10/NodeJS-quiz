const express = require('express')
const route = express.Router()

const { registerDataParticipant, loginDataParticipant, getParticipant, protectedParticipant, getQuestionAndChoices, postParticipantAnswer, getAnswerParticipant } = require('./controllers/assessmentController')

const { participantValidation } = require('./midleware/participantValidation')
const { authParticipant } =require('./midleware/authParticipant')
const {registerParticipant, loginParticipant} = require('./validator/participantValidator')

route.post('/api/register-participant',registerParticipant, participantValidation, registerDataParticipant)
route.post('/api/login-participant',loginParticipant, participantValidation, loginDataParticipant)
route.get('/api/participant', getParticipant)
route.get('/api/protected-info-participant', authParticipant, protectedParticipant)
route.get('/api/question-and-choice', getQuestionAndChoices)
route.post('/api/participant-answer', postParticipantAnswer)
route.get('/api/get-participant-answer', getAnswerParticipant)


module.exports = route;