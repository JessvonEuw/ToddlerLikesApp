import express from 'express';
import foodsRoutes from './routes/foods/index.ts';

const port = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Food endpoints
app.use('/foods', foodsRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});