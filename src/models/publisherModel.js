const mongoose = require('mongoose')


//Write a post api that creates a publisher resource 
//from the details in the request bodyd
const publisherSchema = new mongoose.Schema({

    name: String,
    headQuarter: String,
}, { timestamps: true }

)
module.exports = mongoose.model('myPublisher', publisherSchema)









