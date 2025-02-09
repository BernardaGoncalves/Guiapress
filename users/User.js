const Sequelize = require("sequelize")
const connection = require("../database/database")

const User = connection.define('users',{
    email:{
        type: Sequelize.STRING, // tipo string
        allowNull: false //para nao permitir valores nulos no titulo
    },password: { // slug e o endereco da categoria 
        type: Sequelize.STRING,
        allowNull: false 
    }
})

//User.sync({force:false}) //para sincronizar as tabelas com o bd 

module.exports = User