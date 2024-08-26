import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js'
import logger from './config/logger.js';
import employeeRoutes from './routes/employees.js';
import cafeRoutes from './routes/cafes.js';
// import employeeCafeRoutes from './routes/employeeCafe.js';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/employees', employeeRoutes);
app.use('/cafes', cafeRoutes);
// app.use('/employeecafe', employeeCafeRoutes); 

app.listen(port, async () => {
  try {
    await sequelize.sync();
    logger.info(`Server running on port ${port}`);
  } catch (err) {
    logger.error('Unable to connect to the database:', err);
  }
});
