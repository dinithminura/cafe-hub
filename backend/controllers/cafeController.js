import * as cafeService from '../services/cafeService.js';
import logger from '../config/logger.js';

export const getCafeById = async (req, res) => {
    try {
        const cafeId = req.params.id;
        const cafe = await cafeService.getCafeById(cafeId);
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
        const cafes = await cafeService.getAllCafes(locationFilter);
        res.json(cafes);
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};

export const createCafe = async (req, res) => {
    try {
        const { name, description, location } = req.body;
        const logo = req.file ? req.file.filename : null;
        const cafe = await cafeService.createCafe(name, description, location, logo);
        res.json({ message: 'Cafe added', cafe });
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};

export const updateCafe = async (req, res) => {
    try {
        const { id } = req.params;
        const cafe = await cafeService.updateCafe(id, req.body);
        if (!cafe) {
            return res.status(404).send('Cafe not found');
        }
        res.status(200).json({ message: 'Cafe updated successfully', cafe });
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};

export const deleteCafe = async (req, res) => {
    try {
        const { id } = req.params;
        const cafe = await cafeService.deleteCafe(id);
        if (!cafe) {
            return res.status(404).send('Cafe not found');
        }
        res.status(200).send('Cafe and its employees deleted successfully');
    } catch (err) {
        logger.error(err.message);
        res.status(400).send(err.message);
    }
};
