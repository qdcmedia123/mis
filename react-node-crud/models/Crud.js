const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CrudSchema = new mongoose.Schema({
	email: {
		type:String,
		required:true
	},
	firstname: {
		type: String,

	},
	lastname: {
		type:String
	}

})


export default mongoose.model('Crud', CrudSchema);
