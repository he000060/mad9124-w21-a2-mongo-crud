import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	
	firstName: {type:String, required: true, maxlength:64},
	lastName: {type:String, required: true, maxlength:64},
	nickname:{type:String, maxlength:64},
	email: { type: String, trim: true, maxlength: 512 },
	  

	
})


const Model = mongoose.model('Student', schema)


export default Model