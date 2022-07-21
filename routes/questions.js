const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const controller = require('../controllers/questions');

const router = express.Router();

// Get All Questions
router.get('/', controller.getQuestions);

// Get A Specific Question
router.get('/:id', controller.getQuestion);

// Post a Question
router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
    }),
  }),
  controller.postQuestion
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
  controller.updateQuestion
);
// Delete A Question
router.delete('/:id', controller.deleteQuestion);

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
  controller.postAnswer
);

// Getting a specific answer
router.get('/:id/answers/', controller.getAnswer);

module.exports = router;
