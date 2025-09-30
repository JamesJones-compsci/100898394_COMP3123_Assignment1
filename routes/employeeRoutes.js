const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// POST /api/employees
// Create a new employee
// Public (May change to protected)
router.post('/', async(req, res) => {
    const { first_name, last_name, email, position, salary } = req.body;

    try {
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee){
            return res.status(400).json({ message: 'An employee already exists with this email address'});
        }

        const employee = new Employee( { first_name, last_name, email, position, salary})
        await employee.save();

        res.status(201).json({ message: 'Employee has been created successfully', employee});
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET /api/employees
// Get all employees
// Public access
router.get('/', async(req, res) => {
    try{
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// GET /api/employees/:id
// Get single employee by ID
// Public access
router.get('/:id', async(req, res) => {
    try{
        const employee = await Employee.findById(req.params.id);
        if(!employee){
            return res.status(400).json({ message: 'No employee with that Id'})
        }
        
        res.status(200).json(employee);
    } catch (err){
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// PUT /api/employees/:id
// Update employee by ID
// Public access
router.put('/:id', async(req, res) => {
    try{
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body, 
            { new: true, runValidators: true } // retun an updated doc and validate
        );

        if (!updatedEmployee){
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee has been updated successfully', employee: updatedEmployee});
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Delete /api/employees/:id
// Delete employee by ID
// Public access
router.delete('/:id', async(req, res) => {
    try{
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

        if (!deletedEmployee){
            return res.status(404).json({ message: 'Employee not found'});
        }

        res.status(200).json({ message: 'Employee has been deleted successfully'});
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router; 