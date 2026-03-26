import express from 'express';
import { voiceController } from './voice/controller.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

voiceController(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
