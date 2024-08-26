import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './employeeCafeDB.sqlite',
});

export default sequelize;
