const express = require("express")
const router = express.Router()
const User = require("./User")
const bcrypt = require("bcryptjs")
const { where } = require("sequelize")
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/users", adminAuth, (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users})
    })
    //res.send("Listagem de usuários")
})

router.get("/admin/users/create", adminAuth, (req, res) => {
    res.render("admin/users/create")
})

router.post("/users/create", adminAuth, (req, res) =>{
    var email = req.body.email
    var password = req.body.password

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(user == undefined){
            
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password,salt)

    User.create({
        email: email,
        password: hash
    }).then(() => {
        res.redirect("/")
    }).catch((error) => {
        res.redirect("/")
    })

        }else{
            res.redirect("/admin/users/create")
        }
    })


    //res.json({email, password}) teste dos dados
})

router.get("/login", (req, res) => {
    res.render("admin/users/login")
})

router.post("/authenticate", (req, res) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({where : {email: email}}).then(user => {
        if(user != undefined){
            // se o usuario existir 
            var correct = bcrypt.compareSync(password, user.password)

            if(correct){
                req.session.user= {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles")
            }else{
                res.redirect("/login")
            }

        }else {
            res.redirect("/login")
        }
    })
})

router.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect("/")
})

module.exports = router