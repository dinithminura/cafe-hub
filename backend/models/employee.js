import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import { generateEmployeeID } from '../utils/uuidGenerator.js';

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: generateEmployeeID,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[89]\d{7}$/,
        },
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
    },
    cafe_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'Cafes',
            key: 'id',
        },
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'Employees',
});

export default Employee;
