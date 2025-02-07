const Sequelize = require("sequelize")

const connection = new Sequelize('guiapress', 'root', 'Doramaslove#098', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "+01:00"
});

module.exports = connection;