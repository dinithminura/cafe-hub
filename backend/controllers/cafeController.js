import { Op } from 'sequelize';
import { Cafe, Employee, sequelize } from '../models/index.js';
import { generateCafeID } from '../utils/uuidGenerator.js';
import logger from '../config/logger.js';

export const getCafeById = async (req, res) => {
    try {
      const cafeId = req.params.id;
      const cafe = await Cafe.findByPk(cafeId);
  
      if (!cafe) {
        return res.status(404).json({ message: 'Café not found' });
      }
  
      res.json(cafe);
    } catch (err) {
      logger.error(err.message);
      res.status(500).send(err.message);
    }
  };

export const getAllCafes = async (req, res) => {
    try {
        const locationFilter = req.query.location || '';

        const cafes = await Cafe.findAll({
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
                attributes: [], // Exclude attributes from Employee model
            },
            group: ['Cafe.id'],
            order: [[sequelize.literal('employee_count'), 'DESC']],
        });

        res.json(cafes);
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
};

export const createCafe = async (req, res) => {
    try {
        const { name, description, location } = req.body;
        const id = generateCafeID();
        const logo = req.file ? req.file.filename : null;
        const cafe = await Cafe.create({ id, name, description, location, logo });
        res.json({ message: 'Cafe added', cafe });
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};

export const updateCafe = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, logo, location } = req.body;
        console.log("NEW CAFE: ", req.body)

        const cafe = await Cafe.findByPk(id);

        if (!cafe) {
            return res.status(404).send('Cafe not found');
        }

        // Update the cafe details
        if (name) cafe.name = name;
        if (description) cafe.description = description;
        if (logo) cafe.logo = logo;
        if (location) cafe.location = location;

        await cafe.save();

        return res.status(200).json({ message: 'Cafe updated successfully', cafe })
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};

export const deleteCafe = async (req, res) => {
    try {
        const { id } = req.params;

        const cafe = await Cafe.findByPk(id);

        if (!cafe) {
            return res.status(404).send('Cafe not found');
        }

        // Delete all employees under the cafe
        await Employee.destroy({
            where: { cafe_id: id },
        });

        // Delete the cafe
        await cafe.destroy();

        res.status(200).send('Cafe and its employees deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
};
