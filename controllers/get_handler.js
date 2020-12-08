const BlogModel = require('../model/BlogModel')
const UserModel = require('../model/UserModel')
var user = require('./post_handler').user

getHandler = (app) =>{

    app.get('/', (req, res)=>{
        res.render('new-post-error')
    })
    app.get('/', (req, res)=>{
        res.redirect('/blogs')
    })

    let postVar
    app.get('/blogs', (req, res)=>{
        BlogModel.find({}).sort({createdAt : -1})
            .then((posts)=>{
                postVar = posts
                res.render('homepage',{
                    data : posts,
                    user : user[0].username,
                    heading : null
                })
                module.exports = posts
            })
            .catch((err)=>{
                res.render('homepage',{
                    data : postVar,
                    user : "",
                    heading : null
                })
                console.log('an error occoured', err)
            })
    })

    app.get('/new-post', (req, res)=>{
        res.render('new-post')
    })

    app.get('/blogs/:_id',(req, res)=>{
        console.log(user[0].username)
        let _id = req.params._id
        BlogModel.findOne({_id})
            .then((blog)=>{
                res.render('single-blog', {
                    data : blog,
                    user : user[0].username
                })
                console.log(_id)
            })
            .catch((err)=>{
                console.log(err)
            })
    })

    app.get('/login-page',(req, res)=>{
        res.render('login-page',{message : ''})
    })

    app.get('/sign-up-page', (req, res)=>{
        res.render('sign-up-page')
    })

    /* Searching for a post */
    app.get('/blog-posts/search', (req, res)=>{
        let search = req.query.search.toLowerCase()
        BlogModel.find({}).sort({createdAt : -1})

        .then((result)=>{

            let arr = []
            result.map((blog)=>{
                if(blog.title.toLowerCase().includes(search) | blog.submitter.toLowerCase().includes(search)){

                    arr.push(blog)
                }               
            })
            res.render('homepage', {
                data : arr,
                user : user[0].username,
                heading : `Top search results for "${search}"`
            })

            console.log(arr)
        })
        .catch(()=>{
            console.log('blog post not found')
        })
        console.log(req.query.search)
    })

    app.get('/logout',(req, res)=>{

        BlogModel.find({}).sort({createdAt : -1})
        .then((posts)=>{

            res.render('homepage',{
                data : posts,
                user : undefined,
                heading : null
            })

        })
        .catch(()=>{
            console.log('logging out was unsucessful')
        })
        
    })
}

module.exports = getHandler