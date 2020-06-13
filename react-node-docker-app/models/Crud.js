const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CrudSchema = new mongoose.Schema({
	name: {
		type:String,
		required:true
	},
	card_number: {
		type: String,
		required: true

	},
	limit: {
		type:String,
		required: true
	},
	balance: {
		type: Number,
		required: true
	}

})


export default mongoose.model('Cards', CrudSchema);
