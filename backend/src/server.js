import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';



const app = express();
const PORT = process.env.PORT;
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Cartivo Backend is running!!!!!!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;