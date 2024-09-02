import { Op } from 'sequelize';
import { Cafe, Employee, sequelize } from '../models/index.js';
import { generateCafeID } from '../utils/uuidGenerator.js';

export const getCafeById = async (cafeId) => {
    return await Cafe.findByPk(cafeId);
};

export const getAllCafes = async (locationFilter) => {
    return await Cafe.findAll({
        where: locationFilter ? {
            location: {
                [Op.like]: `%${locationFilter}%`,
            },
        } : {},
        attributes: [
            'id', 'name', 'description', 'logo', 'location',
            [sequelize.fn('COUNT', sequelize.col('Employees.id')), 'employee_count']
        ],
        include: {
            model: Employee,
            attributes: [],
        },
        group: ['Cafe.id'],
        order: [[sequelize.literal('employee_count'), 'DESC']],
    });
};

export const createCafe = async (name, description, location, logo) => {
    const id = generateCafeID();
    return await Cafe.create({ id, name, description, location, logo });
};

export const updateCafe = async (id, { name, description, logo, location }) => {
    const cafe = await Cafe.findByPk(id);
    if (!cafe) {
        return null;
    }
    if (name) cafe.name = name;
    if (description) cafe.description = description;
    if (logo) cafe.logo = logo;
    if (location) cafe.location = location;
    await cafe.save();
    return cafe;
};

export const deleteCafe = async (id) => {
    const cafe = await Cafe.findByPk(id);
    if (!cafe) {
        return null;
    }
    await Employee.destroy({ where: { cafe_id: id } });
    await cafe.destroy();
    return cafe;
};
