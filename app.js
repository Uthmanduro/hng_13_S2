import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/me', async (req, res) => {
  try {
    const response = await axios.get('https://catfact.ninja/fact');

    // Simulate fetching user data
    const userData = {
      status: 'success',
      user: {
        email: 'udurosinlohun@gmail.com',
        name: 'Uthman Durosinlohun',
        stack: 'Node.js/Express',
      },
      timestamp: new Date().toISOString(),
      fact: response.data.fact || 'No fact available',
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(8000, () => console.log('App listening on port 8000'));
