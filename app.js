import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    email: 'udurosinlohun@gmail.com',
    current_datetime: new Date().toISOString(),
    github_url: 'https://github.com/Uthmanduro/hng_2025_S1',
  });
});

app.listen(8000, () => console.log('App listening on port 8000'));
