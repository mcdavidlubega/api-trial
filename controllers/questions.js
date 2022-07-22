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

class controller {
  static getQuestions = (req, res) => {
    if (questions.length < 1)
      res.status(400).json({ message: 'No question not found' });
    res.status(200).json(questions);
  };

  static getQuestion = (req, res) => {
    const question = questions.find(
      (q) => q.id === parseInt(req.params.id, 10)
    );
    if (!question) res.status(400).json({ message: 'Question was not found' });
    res.status(200).json(question);
  };

  static postQuestion = (req, res) => {
    const { title, description } = req.body;
    const question = {
      id: questions.length + 1,
      title,
      description,
    };
    questions.push(question);
    res.status(201).json(questions);
  };

  static updateQuestion = (req, res) => {
    const { title, description } = req.body;
    const question = questions.find(
      (q) => q.id === parseInt(req.params.id, 10)
    );
    if (!question)
      res.status(404).json({ message: 'This question doesnt exist' });
    if (question) {
      question.title = title || question.title;
      question.description = description || question.description;
      res.status(201).json(question);
    }
  };

  static deleteQuestion = (req, res) => {
    const indexOfQuestion = questions.findIndex(
      (q) => q.id === parseInt(req.params.id, 10)
    );
    if (indexOfQuestion === -1)
      res.status(404).json({ message: 'Question not found' });
    if (indexOfQuestion) {
      questions.splice(indexOfQuestion, 1);
      res.status(201).json({ message: 'Question deleted' });
    }
  };

  static postAnswer = (req, res) => {
    // const { questionId, answer } = req.body;

    const newAnswer = {
      id: answers.length + 1,
      questionId: parseInt(req.params.id, 10),
      answer: req.body.answer,
    };
    answers.push(newAnswer);
    res.status(201).json({ message: 'Your answer was successfully submited' });
  };

  static getAnswer = (req, res) => {
    const getAnswer = answers.filter(
      (a) => a.questionId === parseInt(req.params.id, 10)
    );
    if (!getAnswer || getAnswer.length < 1) {
      res
        .status(404)
        .json({ message: 'There are no answers for this question' });
    }
    if (getAnswer) res.status(200).json(getAnswer);
  };
}

export default controller;
