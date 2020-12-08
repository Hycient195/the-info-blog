const express = require('express')
const BlogModel = require('../model/BlogModel')
const UserModel = require('../model/UserModel')
let {posts} = require('./get_handler')

var user = []


postHandler = (app) =>{

    app.use(express.urlencoded({extended : true}))    

    app.post('/sign-up', (req, res)=>{
        let User = new UserModel(req.body)
        User.save()
            .then(()=>{
                res.redirect('/login-page')
                console.log(req.body)
            })
            .catch((err)=>{
                console.log(err)
            })
        
    })

    app.post('/login', (req, res)=>{

        let username = req.body.username
        let password = req.body.password

        UserModel.findOne({username : username}).sort({createdAt : -1})
            .then((loggedInUser)=>{

                UserModel.find({password})
                    .then((pwd)=>{
                        if(loggedInUser.password == password){

                            BlogModel.find({}).sort({createdAt : -1})
                                .then((data)=>{
                                    user.unshift(loggedInUser)
                                res.render('homepage', {
                                    data : data,
                                    user : user[0].username,
                                    heading : ''
                                })
                                })
                            
                            console.log(loggedInUser)
                        }else{
                            res.render('login-page',{
                                message : 'username or password incorrect'
                            })
                            console.log('Username or password incorrect!')
                        }
                        
                    })
                    .catch(()=>{
                        console.log('Password incorect')
                        res.render('login-page',{
                            message : 'username or password incorrect!'
                        })
                    })

                
            })
            
            .catch(()=>{
                console.log('Username or password incorrect')
                res.render('login-page',{
                    message : 'username or password incorrect!'
                })
            })
    })

    app.get('/blog-posts',(req,res)=>{
        BlogModel.find({})
            .then((blogs)=>{
                res.render('homepage', {
                    data : blogs,
                    user : user,
                    heading : null
                })
            })
    })

    app.post('/new-post', (req, res)=>{
        // let Blog = new BlogModel(req.body)
      
        UserModel.findOne({})
        let Blog = new BlogModel({
            title : req.body.title,
            content : req.body.content,
            submitter : user[0].username
        })
        Blog.save()
            .then(()=>{
                console.log('some')
                BlogModel.find({}).sort({createdAt : -1})
                    .then((blogs)=>{
                        alert('something is here')
                        // if(false){
                            res.render('homepage', {
                                data : blogs,
                                user : user[0].username,
                                heading : ''
                            })
                        // }else{
                        //     // console.log('No logged in user')
                        //     alert('Soething occoured, no user')
                        // }
                    })
                    .catch(()=>{
                        console.log('erronous')
                        res.render('new-post-error')
                    })
                   
                   
                
            })
            .catch(()=>{
                // console.log(err)
                res.render('new-post-error')
            })
        // res.redirect('/blogs')
        console.log(req.body)

    })
}

module.exports = {
    postHandler,
    user
}
