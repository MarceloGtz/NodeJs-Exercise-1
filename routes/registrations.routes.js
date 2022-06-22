const express = require('express');
const { body, validationResult } = require('express-validator');

// Controllers
const {
  getAllRegistrations,
  createRegistration,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
} = require('../controllers/registration.controller');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Array has errors

    // Step 1: Loop through array of errors
    // Step 2: Get all error msg's [msg, msg, msg]
    // Step 3: Combine (join), all strings in the array
    // Step 4: Send the combined msg in the response
    let errorsRaw = errors.array(); // [{ value, msg, param, location }, { value, msg, param, location }, ...]
    let errorsArray = [];
    errorsRaw.map(errorMsg => {
      errorsArray.push(errorMsg.param);
      errorsArray.push(errorMsg.msg);
    });
    let erroresfinal = errorsArray.join(' ').toLowerCase();

    return res.status(400).json({ status: 'error', message: erroresfinal });
  }

  next();
};

const registrationsRouter = express.Router();

registrationsRouter.get('/', getAllRegistrations);

registrationsRouter.post(
  '/',
  body('entranceTime').notEmpty(),
  checkResult,
  createRegistration
);

registrationsRouter.get('/:id', getRegistrationById);

registrationsRouter.patch('/:id', updateRegistration);

registrationsRouter.delete('/:id', deleteRegistration);

module.exports = { registrationsRouter };
