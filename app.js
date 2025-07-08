import express from 'express';
import movieRouter from './routers/movie.js'
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());

app.use('/movie', movieRouter)
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.listen(3000);

export default app;