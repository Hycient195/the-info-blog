const functions = require('firebase-functions')

const express = require('express')
const mongoose = require('mongoose')

const getHandler = require('../controllers/get_handler')
const postHandler = require('../controllers/post_handler').postHandler
const deleteHandler = require('../controllers/delete_handler')
const BlogModel = require('../model/BlogModel')

const app = express()

// app.get('/', (req, res)=>{
//     res.send('i hace seen you')
// })

app.set('view engine', 'ejs')
app.use(express.static('../public'))

// const dbURL = 'mongodb+srv://Hycient:passwords@cluster0.d6mr2.mongodb.net/blog-database?retryWrites=true&w=majority'
const dbURI = "mongodb://localhost/blog-database"
mongoose.connect(dbURI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})


mongoose.connection
    // eslint-disable-next-line promise/always-return
    .then(()=>{
        app.listen(3000, ()=>{
            console.log('Server is started on port 3000')
        })
        console.log('Connected sucessfully to database')

    })
    .catch((err)=>{
        console.log('an error occoured', err)
    })


    getHandler(app)
    // postHandler(app)
    // deleteHandler(app)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.app = functions.https.onRequest(app);


