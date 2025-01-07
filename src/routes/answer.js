
const auth = require("../middleware/auth.js");
const express = require('express');


const {
    INSERT_QUESTION,
    GET_ALL_QUESTIONS,
    GET_ANSWERS_BY_ID,
    DELETE_QUESTION_BY_ID,
    INSERT_ANSWERS_BY_ID,
    DELETE_ANSWER_BY_ID
} = require("../controllers/question");

const router = express.Router();

router.get('/questions', auth, GET_ALL_QUESTIONS);
router.post('/question', auth, INSERT_QUESTION);
router.delete('question/:id', auth, DELETE_QUESTION_BY_ID);
router.get('question/:id/answers', auth, GET_ANSWERS_BY_ID);
router.post('question/:id/answers', auth, INSERT_ANSWERS_BY_ID)
router.delete('/answer/:id', auth, DELETE_ANSWER_BY_ID)


module.exports = router;


