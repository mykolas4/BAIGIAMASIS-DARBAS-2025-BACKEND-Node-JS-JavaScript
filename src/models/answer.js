const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answer_text: { type: String, required: true }, 
    date: { type: Date, required: true  }, 
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true } 
});
module.exports = mongoose.model("Answer", answerSchema);
