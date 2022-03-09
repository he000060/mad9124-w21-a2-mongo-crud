import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	
	code: {type:String, required: true, maxlength:16},
	title: {type:String, required: true, maxlength:256},
	description:{type:String, required: false, maxlength:2048},
	url:{type:String, required: false, maxlength:512},
	students: { type: String, required:false},
	  

	
})



const Model = mongoose.model('Courses', schema)


export default Model