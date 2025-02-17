import express, { json, urlencoded } from 'express';
import serverless from 'serverless-http';
import authRoutes from './routes/auth/index.js';
import itemsRoutes from './routes/items/index.js';
import familiesRoutes from './routes/families/index.js';
import tagsRoutes from './routes/tags/index.js';

const port = 3000;

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Auth Routes
app.use('/auth', authRoutes);

// Family Routes
app.use('/families', familiesRoutes);

// Item Routes
app.use('/items', itemsRoutes);

// Tag Routes
app.use('/tags', tagsRoutes);

if (process.env.NODE_ENV === 'dev') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
