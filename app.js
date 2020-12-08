// const functions = require('firebase-functions')

const express = require('express')
const mongoose = require('mongoose')

const getHandler = require('./controllers/get_handler')
const postHandler = require('./controllers/post_handler').postHandler
const deleteHandler = require('./controllers/delete_handler')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('./public'))

const dbURL = 'mongodb+srv://Hycient:passwords@cluster0.d6mr2.mongodb.net/blog-database?retryWrites=true&w=majority'
// const dbURI = "mongodb://localhost/blog-database"
mongoose.connect(dbURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const port = process.env.PORT || 3000
    
mongoose.connection
    .then(()=>{
        app.listen(port, ()=>{
            console.log('Server is started on port 3000')
        })
        console.log('Connected sucessfully to database')
    })
    .catch((err)=>{
        console.log('an error occoured', err)
    })

getHandler(app)
postHandler(app)
deleteHandler(app)


// exports.app = functions.https.onRequest(app);