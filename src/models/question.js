const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question_text: { type: String, required: true },
    date: { type: Date, default: Date.now }, 
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

module.exports = mongoose.model("Question", QuestionSchema);
