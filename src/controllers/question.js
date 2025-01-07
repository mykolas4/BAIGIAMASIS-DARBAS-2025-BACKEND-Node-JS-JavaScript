const { v4: uuidv4 } = require('uuid');
const QuestionSchema = require("../models/question");

let questions = []; 

const INSERT_QUESTION = async (req, res) => {
  try {
    const newQuestion = {
      id: uuidv4(),
      question_text: req.body.question_text,
      date: new Date(),
      userId: req.body.userId,
    };

    const isTitleExists = questions.some((question) => question.title === req.body.title);

    if (isTitleExists) {
      return res.status(409).json({ message: "this question already exist" });
    }

    const question = new QuestionSchema(newQuestion);

    const response = await question.save();

    return res
      .status(201)
      .json({ response: "question was inserted successfully", question: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionSchema.find({ userId: req.body.userId });
    return res.status(200).json({ questions: questions });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_ANSWERS_BY_ID = async (req, res) => {
  try {
    const question = await QuestionSchema.findOne({ id: req.params.id });

    if (question.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "This resourse does not belong to you" });
    }

    if (!question) {
      return res
        .status(404)
        .json({ message: `no answer with id ${req.params.id}` });
    }

    return res.status(200).json({ question: question });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};


const DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionSchema.findOne({ id: req.params.id });

    if (question.userId !== req.body.userId) {
      return res
        .status(403)
        .json({ message: "This resourse does not belong to you" });
    }

    if (!question) {
      return res
        .status(404)
        .json({ message: `question with ${req.params.id}  does not exist` });
    }

    const response = await QuestionSchema.findOneAndDelete({ id: req.params.id });

    return res
      .status(200)
      .json({ response: "question was deleted", question: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};


const INSERT_ANSWERS_BY_ID = async (req, res) => {
  try {
    const newQuestion = {
      id: uuidv4(),
      answer_text: req.body.answer_text,
      date: new Date(),
      questionID: req.body.questionID,
    };

    const isTitleExists = questions.some((question) => question.title === req.body.title);

    if (isTitleExists) {
      return res.status(409).json({ message: "this answer already exist" });
    }

    const question = new QuestionSchema(newQuestion);

    const response = await question.save();

    return res
      .status(201)
      .json({ response: "answer was inserted successfully", question: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_ANSWER_BY_ID = async (req, res) => {
    try {
      const question = await QuestionSchema.findOne({ id: req.params.id });
  
      if (question.userId !== req.body.userId) {
        return res
          .status(403)
          .json({ message: "This resourse does not belong to you" });
      }
  
      if (!question) {
        return res
          .status(404)
          .json({ message: `answer with ${req.params.id}  does not exist` });
      }
  
      const response = await QuestionSchema.findOneAndDelete({ id: req.params.id });
  
      return res
        .status(200)
        .json({ response: "answer was deleted", question: response });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "we have some problems" });
    }
  };
  module.exports = {
    INSERT_QUESTION,
    GET_ALL_QUESTIONS,
    GET_ANSWERS_BY_ID,
    DELETE_QUESTION_BY_ID,
    INSERT_ANSWERS_BY_ID,
    DELETE_ANSWER_BY_ID,
  };
