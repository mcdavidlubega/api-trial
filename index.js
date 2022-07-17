const express = require('express');
const { errors } = require('celebrate');
const questions = require('./routes/questions');
const home = require('./routes/home');

const app = express();

app.use(express.json());
app.use('/api/v1/questions', questions);
// app.use('/api/v1/answers', answers);
app.use('/', home);
app.use(errors());
const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));
