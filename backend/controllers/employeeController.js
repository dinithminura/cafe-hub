import * as employeeService from '../services/employeeService.js';
import logger from '../config/logger.js';

export const getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await employeeService.getEmployeeById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the employee' });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const cafeFilter = req.query.cafe || '';
        const employees = await employeeService.getAllEmployees(cafeFilter);
        res.json(employees);
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};

export const createEmployee = async (req, res) => {
    try {
        const employee = await employeeService.createEmployee(req.body);
        res.status(201).json(employee);
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeService.updateEmployee(id, req.body);

        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        res.status(200).json(employee);
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeService.deleteEmployee(id);

        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        res.status(200).send('Employee deleted successfully');
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};
