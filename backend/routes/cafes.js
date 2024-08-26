import express from 'express';
import { getAllCafes, createCafe, updateCafe, deleteCafe, getCafeById } from '../controllers/cafeController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllCafes);
router.get('/:id', getCafeById);
router.post('/', upload.single('logo'), createCafe);
router.put('/:id', upload.single('logo'), updateCafe);
router.delete('/:id', deleteCafe);

export default router;
