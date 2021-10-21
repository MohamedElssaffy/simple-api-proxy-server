require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(cors());
app.use(limiter);

app.use(express.static('public'));

app.use('/api', require('./routes'));
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`App Running on port ${PORT}`));
