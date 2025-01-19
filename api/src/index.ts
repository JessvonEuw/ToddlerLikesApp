import express, { json, urlencoded } from 'express';
import preferencesRoutes from './routes/preferences/index.ts';

const port = 3000;

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Preference endpoints
app.use('/preferences', preferencesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});