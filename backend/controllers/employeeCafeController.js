// import EmployeeCafe from '../models/employeeCafe.js';
// import logger from '../config/logger.js';

// export const assignEmployeeToCafe = async (req, res) => {
//   try {
//     const { employee_id, cafe_id, start_date } = req.body;
//     const assignment = await EmployeeCafe.create({ employee_id, cafe_id, start_date });
//     res.json({ message: 'Employee assigned to cafe', assignment });
//   } catch (err) {
//     logger.error(err.message);
//     res.status(400).send(err.message);
//   }
// };
