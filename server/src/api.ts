import * as express from 'express';
const router = express.Router();

router.get('/about', (req, res) => {
  console.log(req.url);
  res.json({ title: 'Hello' })
});

export default router;
