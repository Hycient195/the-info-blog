const BlogModel = require('../model/BlogModel')
const user = require('./post_handler').user

deleteHandler = (app) =>{

    app.delete('/blogs/delete/:_id', (req, res)=>{
        console.log('the dele')
        
       
        let _id = req.params._id
        BlogModel.findByIdAndDelete(_id)
            .then((data)=>{
                console.log(`post ${_id} has been deleted`)
                // console.log(data)
                res.redirect('/blogs')
            })
            .catch(()=>{
                console.log('An error occoured while deleting')
            })
            
    })

}

module.exports = deleteHandler