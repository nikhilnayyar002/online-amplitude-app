const mongoose = require('mongoose')
const QuestionSchema = require('./question.schema')
const sectionSchema = require('./section.schema')

var testSchema = new mongoose.Schema({
    name:{type:String},
    questions: [QuestionSchema],
    sections: [sectionSchema],
    time: { type:Number },
    _id: { type:Number }
});

module.exports = mongoose.model('Test', testSchema)

