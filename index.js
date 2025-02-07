const express = require("express")
const app = express()
const bodyParser =  require("body-parser")
const connection = require("./database/database")

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

const Article = require("./articles/Article")
const Category = require("./categories/Category")
const { where } = require("sequelize")


// cnfiguracao do View engine
app.set('view engine', 'ejs')

// Arquivos estaticos, estatic 
app.use(express.static('public')) // caminho da pasta onde ficara os arquivos estaticos


//configuracao do Body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Database
connection
    .authenticate()
    .then(() =>{
        console.log("Conexao feita com sucesso")
    }).catch((error) => {
        console.log(error)
    })

// dizendo ao express pra utilizar na minha app a rota que foi criada noutro arquivo
app.use("/", categoriesController)
app.use("/", articlesController)

//Rota da home page dos artigos
app.get("/", (req,res) => {
    Article.findAll({
        order: [
            ['id', 'DESC'] 
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories})
        })
    })
})

app.get("/:slug", (req, res) => {
    var slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories})
            })
        }else {
            res.render("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category =>{
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })
        }else{
            res.redirect("/")
        }
    }).catch(error =>{
        res.redirect("/")
    })
})
app.listen(8081, () => {
    console.log("O servidor esta rodando")
})