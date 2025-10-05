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
        employee_id: newEmployee._id.toString(), // only return ID
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
    const cleaned = employees.map(emp => ({
      employee_id: emp._id.toString(),          // changed from emp.employee_id
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      position: emp.position,
      salary: emp.salary,
      date_of_joining: emp.date_of_joining || null, // fallback if undefined
      department: emp.department || null         // fallback if undefined
    }));
    res.status(200).json(cleaned);
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

      const result = {
        employee_id: employee._id.toString(),       // changed from employee.employee_id
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        position: employee.position,
        salary: employee.salary,
        date_of_joining: employee.date_of_joining || null,
        department: employee.department || null
      };

      res.status(200).json(result);
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

      // Only return message
      res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// DELETE /api/v1/emp/employees?eid=xxx
router.delete('/', async (req, res) => {
  const { eid } = req.query;
  if (!eid) {
    return res.status(400).json({ message: 'Employee ID (eid) is required' });
  }

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(eid);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
