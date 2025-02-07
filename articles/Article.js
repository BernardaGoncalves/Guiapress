const Sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require("../categories/Category")

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING, // tipo string
        allowNull: false //para nao permitir valores nulos no titulo
    },slug: { // slug e o endereco da categoria 
        type: Sequelize.STRING,
        allowNull: false 
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false 
    }
})

//Relacionamento do artigo com a categoria(1->1) E (1-M)
Category.hasMany(Article) // Uma categoria tem muitos artigos
Article.belongsTo(Category) // Um artigo pertence a uma categoria 

//Article.sync({force: true})

module.exports = Article