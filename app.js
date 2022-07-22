import express from 'express';
import { errors } from 'celebrate';
import questions from './routes/questions';
import home from './routes/home';

const app = express();

app.use(express.json());
app.use('/api/v1/questions', questions);
// app.use('/api/v1/answers', answers);
app.use('/', home);
app.use(errors());

export default app;
