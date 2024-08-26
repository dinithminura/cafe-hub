import sequelize from '../config/config.js';
import Employee from './employee.js';
import Cafe from './cafe.js';

Cafe.hasMany(Employee, { foreignKey: 'cafe_id' });
Employee.belongsTo(Cafe, { foreignKey: 'cafe_id' });

export { Employee, Cafe, sequelize };
