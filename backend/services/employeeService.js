import { Employee, Cafe, sequelize } from '../models/index.js';
import { generateEmployeeID } from '../utils/uuidGenerator.js';

export const getEmployeeById = async (employeeId) => {
    return await Employee.findByPk(employeeId, {
        include: {
            model: Cafe,
            attributes: ['id', 'name'],
        },
    });
};

export const getAllEmployees = async (cafeFilter) => {
    console.log(cafeFilter);
    return await Employee.findAll({
        where: cafeFilter ? { cafe_id: cafeFilter } : {},
        attributes: {
            include: [
                [sequelize.literal(`julianday('now') - julianday(start_date)`), 'days_worked'],
            ],
        },
        include: {
            model: Cafe,
            attributes: ['name'],
        },
        order: [[sequelize.literal('days_worked'), 'DESC']],
    });
};

export const createEmployee = async ({ name, email_address, phone_number, gender, cafe_id, start_date }) => {
    const id = generateEmployeeID();
    return await Employee.create({
        id,
        name,
        email_address,
        phone_number,
        gender,
        cafe_id,
        start_date,
    });
};

export const updateEmployee = async (id, updatedData) => {
    const employee = await Employee.findByPk(id);

    if (!employee) {
        return null;
    }

    Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] !== undefined) {
            employee[key] = updatedData[key];
        }
    });

    await employee.save();
    return employee;
};

export const deleteEmployee = async (id) => {
    const employee = await Employee.findByPk(id);

    if (!employee) {
        return null;
    }

    await employee.destroy();
    return employee;
};
