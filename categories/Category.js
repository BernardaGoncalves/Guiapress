const Sequelize = require("sequelize")
const connection = require("../database/database")

const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING, // tipo string
        allowNull: false //para nao permitir valores nulos no titulo
    },slug: { // slug e o endereco da categoria 
        type: Sequelize.STRING,
        allowNull: false 
    }
})

//Category.sync({force:true}) para sincronizar as tabelas com o bd 

module.exports = Category