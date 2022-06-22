const express = require('express');

// Routers
const { registrationsRouter } = require('./routes/registrations.routes');

// Utils
const { db } = require('./utils/database.util');

// Init express app
const app = express();

app.use(express.json());

// Define endpoints
app.use('/api/v1/registrations', registrationsRouter);

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

app.listen(4000, () => {
  console.log('Express app running');
});
