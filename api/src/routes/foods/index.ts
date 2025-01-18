import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('These are your foods')
});

router.get('/:id', (req, res) => {
  console.log(req.params);
  res.send('One food found');
});

router.post('/', (req, res) => {
  res.send('These are your foods')
});

export default router;