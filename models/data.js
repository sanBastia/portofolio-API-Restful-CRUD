var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create a schema
var dataSchema = new Schema({
  letter: { type: String, required: true },
  frequency: { type: String, required: true },
  is_deleted: Number
})

// the schema is useless so far
// we need to create a model using it
var Data = mongoose.model('Data', dataSchema)

// make this available to our users in our Node applications
module.exports = Data
