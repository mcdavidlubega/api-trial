import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import controller from '../controllers/questions';

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
router.patch(
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
      answer: Joi.string().min(5).required(),
    }),
  }),
  controller.postAnswer
);

// Getting a specific answer
router.get('/:id/answers/', controller.getAnswer);

export default router;
