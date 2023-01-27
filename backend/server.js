const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('./app/helpers/mongodb.helper');

const app = express();
const router = express.Router();
const appRoutes = require('./app/routes/api')(router);
const PORT = process.env.PORT || 3000;
const authRoute = require('./app/routes/auth.route');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', appRoutes);
app.use('/auth', authRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status);
  res.send({
    error: {
      status,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
