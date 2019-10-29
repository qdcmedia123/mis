import  express from 'express';
const router = express.Router();
import axios from 'axios';
import luhn from 'luhn';

// Import crud model 
import Crud from '../../models/Crud';


// @route   GET api/users/test
// @desc    Tests users route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


// @route   POST api/crud/create
// @desc    Tests users route
// @access  Private

router.post('/create', function (req, res) {

	// let error 
	let errors = {};

	// Check all fiels are there 
	const { name, card_number, limit } = req.body; 
    

    // JSON.stringify()
    if(typeof name === 'undefined' || name === '') {

      errors = {name: "Please provide name."}
      // Log the er
      return res.status(404).json(errors);
    }

    // Create Card number 
    // JSON.stringify()
    var validCard = luhn.validate(card_number);

    if(!validCard) {

      errors = {card_number: "Invalid card number."}
      // Log the er
      return res.status(404).json(errors);
    }

    // limit 
    if(typeof limit === 'undefined' || limit === '') {

      errors = {limit: "Please provide card limit."}
      // Log the er
      return res.status(404).json(errors);
    }

    // Balacne 
    req.body.balance = 0;


   
    const newUser = new Crud(req.body);

    // Save to db 
    newUser.save().then(function (saved) {

        // Send the newuser
        return res.status(200).json(saved);
    }).catch(error => {

        console.log(error);
        return res.status(500).json(error);
    })

})


// @route   POST api/crud/create
// @desc    Tests users route
// @access  Private

router.get('/read', function (req, res) {

	// Find everthing 
	Crud.find({}).then(item => {

		if(item) {
			return res.status(200).json(item);
		}

		return res.status(404).json({nothing_found: 'Unable to find anything at the moment.'})

	})

})

module.exports = router;