const express = require('express');
const Employee = require('../models/Employee');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

// POST /api/v1/emp/employees
router.post(
  '/',
  [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
  ],
  validate,
  async (req, res) => {
    try {
      const existingEmployee = await Employee.findOne({ email: req.body.email });
      if (existingEmployee) {
        return res.status(400).json({ message: 'Employee already exists with this email' });
      }

      const newEmployee = new Employee(req.body);
      await newEmployee.save();

      res.status(201).json({
        message: 'Employee created successfully.',
        employee: newEmployee,   // 👈 now returns with `employee_id`
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// GET /api/v1/emp/employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees); // 👈 all have employee_id
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/v1/emp/employees/:id
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid employee ID')],
  validate,
  async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(employee); // 👈 will show employee_id
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// PUT /api/v1/emp/employees/:id
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid employee ID'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  ],
  validate,
  async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(updatedEmployee); // 👈 employee_id included
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// DELETE /api/v1/emp/employees/:id
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid employee ID')],
  validate,
  async (req, res) => {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(204).send();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;