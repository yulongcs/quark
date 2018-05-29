import * as express from 'express';
import api from './api';

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/api/v0', api);

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
