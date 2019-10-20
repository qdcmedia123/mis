import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

function App(props) {

	const [items, setItem] = useState({items: {}})
	const [isLoading, setIsLoading] = useState(true);
	


	// Get the id 

	const id = props.match.params.id;

	items.id = id;
	
	useEffect(() => {
		const getUser = async function getUser() {

		setIsLoading(true);

		let response = await axios(`/api/crud/get_by_id?id=${id}`);
			
		if(response.status === 200 || response.ok === true) {
			
			setItem(response.data);
		} else {

			alert('Something went wrong')
		}
		 
		 setIsLoading(false);
		};
		  getUser();
	}, [id]);


	const changeHandler = event => {

		const { name, value } = event.target
		setItem({ ...items, [name]: value })
	}

	const submitHandler = (e) => {

		// Get the form values

		// Send axious request 
	   e.preventDefault();


		axios.post('/api/crud/update', items).then( function(res) {
			// Check status \
	    console.log(res);
		if(res.status === 200) { 		
	     
		 		props.history.push('/?updated=true');
	 	} else {

	 		console.log('Something went wrong');
	 	}	
		}).catch(error => {

		 	console.log(error);
		 })
	}




	// Get the project 

	return (
			<div>
				{isLoading ? (<div>Loading....</div>) : (<div>

						 <div>
  	<div className = "row">
  		<div className = "container">
  		<form
  			className="needs-validation"
        onSubmit={submitHandler}

            
  		>
  		
  <div className="form-row">
    <div className="col-md-4 mb-3">
      <label htmlFor="validationServer01">Email</label> 
      <input 
      		name = "email"
      		onChange={changeHandler} 
      		type="text" 
      		className="form-control" 
      		id="validationServer01" 
      		placeholder="First name" 
      		value= {items.email} required 

      		/> 
     
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="validationServer02">Firstname</label>
      <input 
      name = "firstname"
      onChange = {changeHandler}
      value = {items.firstname}
      	type="text" 
      	className="form-control" 
      	id="validationServer02" 
      	placeholder="Last name" 
      	required 
      	/>
      
    </div>

    <div className="col-md-4 mb-3">
      <label htmlFor ="validationServerUsername">Lastname</label>
      <div className="input-group">
        

        
        <input 
        	name = "lastname"
        	onChange = {changeHandler}
        	value = {items.lastname}
        	type="text" 
        	className="form-control" 
        	id="validationServerUsername" 
        	placeholder="Username" 
        	aria-describedby="inputGroupPrepend3" 
        	required />
      </div>
    </div>

  
  <button  className="btn btn-primary" type="submit">Submit form</button>

</div>
</form>
</div>
</div>

    </div>
					</div>)}
			</div>
		)
}

export default withRouter(App);
