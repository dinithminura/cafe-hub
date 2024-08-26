import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import { generateCafeID } from '../utils/uuidGenerator.js';

const Cafe = sequelize.define('Cafe', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: generateCafeID,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    logo: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Cafes',
});

export default Cafe;
