import { Employee, Cafe, sequelize } from '../models/index.js';
import logger from '../config/logger.js';
import { generateEmployeeID } from '../utils/uuidGenerator.js';

export const getEmployeeById = async (req, res) => {    
    try {
        const employeeId = req.params.id;
        
        const employee = await Employee.findByPk(employeeId, {
            include: {
                model: Cafe,
                attributes: ['id', 'name'] 
            }
        });

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

        // Calculate the number of days worked by each employee using SQLite's julianday function
        const employees = await Employee.findAll({
            where: cafeFilter ? { cafe_id: cafeFilter } : {},
            attributes: {
                include: [
                    [sequelize.literal(`julianday('now') - julianday(start_date)`), 'days_worked']
                ]
            },
            include: {
                model: Cafe,
                attributes: ['name'],
            },
            order: [[sequelize.literal('days_worked'), 'DESC']],
        });

        res.json(employees);
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};

export const createEmployee = async (req, res) => {
    try {
        const { name, email_address, phone_number, gender, cafe_id, start_date } = req.body;
        const id = generateEmployeeID();

        const employee = await Employee.create({
            id,
            name,
            email_address,
            phone_number,
            gender,
            cafe_id,
            start_date,
        });

        res.status(201).json(employee);
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email_address, phone_number, gender, cafe_id, start_date } = req.body;

        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        // Update employee details
        if (name !== undefined) employee.name = name;
        if (email_address !== undefined) employee.email_address = email_address;
        if (phone_number !== undefined) employee.phone_number = phone_number;
        if (gender !== undefined) employee.gender = gender;
        if (cafe_id !== undefined) employee.cafe_id = cafe_id;
        if (start_date !== undefined) employee.start_date = start_date;

        await employee.save();

        res.status(200).json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        await employee.destroy();

        res.status(200).send('Employee deleted successfully');
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};
