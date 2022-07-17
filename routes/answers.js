const express = require('express');

const router = express.Router();

const answers = [
  {
    id: 1,
    questionId: 1,
    answer: 'This is the answer to question 1',
  },
  {
    id: 2,
    questionId: 2,
    answer: 'This is the answer to question 2',
  },
  {
    id: 3,
    questionId: 2,
    answer: 'This is the answer to question 3',
  },
];

module.exports = router;
