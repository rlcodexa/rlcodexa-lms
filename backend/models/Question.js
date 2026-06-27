const mongoose = require('mongoose');

// Quiz Questions Schema
const quizQuestionSchema = new mongoose.Schema({
  assessmentId: { type: String, required: true },
  questionNo: { type: Number, required: true },
  question: { type: String, required: true },
  options: [{ type: String }],
  answer: { type: String, required: true },
  module: { type: String, default: "Module 1" },
  moduleId: { type: String, default: '' },
  marks: { type: Number, default: 1 }
});

// Coding Questions Schema
const codingQuestionSchema = new mongoose.Schema({
  codingQuestionId: { type: String, required: true, unique: true },
  assessmentId: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, default: "Easy" },
  language: [{ type: String }],
  testCases: [{
    input: { type: String },
    output: { type: String }
  }],
  module: { type: String, default: "Module 1" },
  moduleId: { type: String, default: '' },
  marks: { type: Number, default: 10 }
});

module.exports = {
  QuizQuestion: mongoose.model('QuizQuestion', quizQuestionSchema, 'quizQuestions'),
  CodingQuestion: mongoose.model('CodingQuestion', codingQuestionSchema, 'codingQuestions')
};
