const express = require('express');

const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');

const questions = [
  {
    id: 1,
    title: 'Question 1',
    description: 'This is a description of question 1',
  },
  {
    id: 2,
    title: 'Question 2',
    description: 'This is a description of question 2',
  },
  {
    id: 3,
    title: 'Question 3',
    description: 'This is a description of question 3',
  },
];
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
// Get All Questions
router.get('/', (req, res) => {
  if (questions.length < 1)
    res.status(404).json({ message: 'Question not found' });
  else res.status(200).json(questions);
});
// Get A Specific Question
router.get('/:id', (req, res) => {
  const question = questions.find((q) => q.id === parseInt(req.params.id, 10));
  if (!question)
    res.status(400).json({ message: 'This quesiton does not exist' });
  res.json(question);
});

// Post a Question
router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
    }),
  }),
  (req, res) => {
    const { title, description } = req.body;
    const question = {
      id: questions.length + 1,
      title,
      description,
    };
    questions.push(question);
    res.status(201).json(questions);
  }
);

// Update A Question
router.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
    }),
  }),
  (req, res) => {
    const { title, description } = req.body;
    const question = questions.find(
      (q) => q.id === parseInt(req.params.id, 10)
    );
    if (!question)
      res.status(400).json({ message: 'This question doesnt exist ' });
    if (question) {
      question.title = title || question.title;
      question.description = description || question.description;
      res.status(201).json(question);
    }
  }
);
// Delete A Question
router.delete('/:id', (req, res) => {
  const indexOfQuestion = questions.findIndex(
    (q) => q.id === parseInt(req.params.id, 10)
  );
  if (!indexOfQuestion) res.status(400).json({ message: 'Question not found' });
  if (indexOfQuestion) {
    questions.splice(indexOfQuestion, 1);
    res.status(201).json({ message: 'Question deleted' });
  }
});

/*
 *  Answers Routes
 */

// Add an answer
router.post(
  '/:id/answers',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      questionId: Joi.number().required(),
      answer: Joi.string().min(5).required(),
    }),
  }),
  (req, res) => {
    // const { questionId, answer } = req.body;
    const newAnswer = {
      id: answers.length + 1,
      questionId: req.body.questionId,
      answer: req.body.answer,
    };
    answers.push(newAnswer);
    res.status(201).json(answers);
  }
);

// Getting a specific answer
router.get('/:id/answers/', (req, res) => {
  const getAnswer = answers.filter(
    (a) => a.questionId === parseInt(req.params.id, 10)
  );
  if (!getAnswer)
    res.status(400).json({ message: 'There is no answer for this question' });
  if (getAnswer) res.status(201).json(getAnswer);
});

module.exports = router;
