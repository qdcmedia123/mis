import  express from 'express';
const router = express.Router();
import axios from 'axios';



// Load User model
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
	const { email, firstname, lastname } = req.body;

 // Check valid email address 
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // JSON.stringify()
    if(!re.test(email)) {

      errors = {email: "Please provide client email address."}
      // Log the er
      return res.status(404).json(errors);
    }


   

    // Then save to db before making crud 
    Crud.findOne({email:email}).then(item => {

    		if(item) {

    			errors.email = 'email address already exists';
    			return res.status(400).json(errors);
    		} else {

    			const newUser = new Crud(req.body);

    			// Save to db 
    			newUser.save().then(function (saved) {

    				// Send the newuser
    				return res.status(200).json(saved);
    			}).catch(error => {

    				console.log(error);
    				return res.status(500).json(error);
    			})
    		}


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


// @route   POST api/crud/get_by_id
// @desc    Tests users route
// @access  Private


router.get('/get_by_id', function (req, res) {

	// Id requeired 
	let errors = {};

	const { id } = req.query;

	// Find by id 
	Crud.findOne({_id: id}).then(found => {

		// if record found 
		if(found) {
			return res.status(200).json(found);
		}

		return res.status(404).json({nothing_found: 'Unable to find anything'});
	})
})



// @route   POST api/crud/update
// @desc    Tests users route
// @access  Puglic


router.post('/update', function (req, res) {

	let errors = {};
	
	delete(req.body._id);

	// Get all document 
	const {id, email , firstname, lastname } = req.body;

	// Check all document is required 
	let checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

	if(!checkForHexRegExp.test(id)) {
	    errors = { mongodb: 'Invalid mongodb '}
	    return res.status(404).json(errors)
	} 

	// Check first name and last name 
	var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // JSON.stringify()
    if(!re.test(email)) {

      errors = {email: "Please provide client email address."}
      // Log the er
      return res.status(404).json(errors);
    }

    // Firstname and lastname 
    if(typeof firstname === 'undefined' 
    	|| firstname === '' || 
    	typeof lastname === 'undefined' ||
    	lastname === ''
    	) {

    	errors = {email: "Please provide firstname and lastname"}
      	// Log the er
      	return res.status(404).json(errors);

    }

    // Lets updated now 

    Crud.findOneAndUpdate({_id: id}, {$set: {firstname: firstname, email: email, lastname: lastname}}, {new: true, useFindAndModify:false}, (error, doc) => {

    	// if error 
    	if(error) {

    		return res.status(500).json(error);
    	}  

    	return res.status(200).json(doc);

    })

})

// @route   DELETE api/crud/delete
// @desc    Tests users route
// @access  Puglic

router.delete('/delete', function (req, res) {

	

	let errors = {};

	// get the id to delete 
	const { id } = req.body;

	Crud.deleteOne({_id: id}).then(deleted => {

		if(deleted){
			return res.status(200).json(deleted);
		}

		return res.status(404).json({not_found: 'unable to deleted anythings.'})
	})
})


// @route   GET api/crud/weather
// @desc    Tests users route
// @access  Puglic
router.get('/weather', function (req, res) {

    // Get the city information 
    const WeatherAPI = '24dd09cbb46694941227d07477e0f69e';
   /* const WeatherAPI = 'b6907d289e10d714a6e88b30761fae22';*/

    // ge city 
   // const location = req.query.location;
    const lat = req.query.lat;
    const lon = req.query.lon;


    // Const lat and lan 
    if(typeof lat === 'undefined' || lat === '') {

        return res.status(404).json({lat: 'Lat is required'});
    }

      if(typeof lon === 'undefined' || lon === '') {

        return res.status(404).json({lon: 'Long is required'});
    }

    

   
    // url https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WeatherAPI}
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WeatherAPI}`;

    // Send axious request 
    axios.get(url).then(function (response) {

        // check status 
        if(response.status === 200) {
           return res.status(200).json(response.data);
        }        
    }).catch(function (err) {
        console.error(err.response.data);    // ***
        console.error(err.response.status);  // ***
        console.error(err.response.headers); //

        return res.status(err.response.status).json(err.response.data);
    })



})

module.exports = router;