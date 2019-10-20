import React, { useState} from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
//import Content from './content/Secoundcategory';


function App(props)  {

	const [items, setItem] = useState({items: {}})

  // send axios request to get the data 
  const changeHandler = event => {
  		
  		const { name, value } = event.target
  		setItem({ ...items, [name]: value })
	}


const submitHandler = (e) => {

	// Get the form values

	// Send axious request 
   e.preventDefault();

	axios.post('/api/crud/create', items).then( function(res) {
		// Check status \
    
	if(res.status === 200) { 		
     
	 		props.history.push('/?created=true');
 	} else {

 	}
	}).catch(error => {

	 	console.log(error);
	 })
}

  
console.log(items);

  return (
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
      		value= {items.items.email} required 

      		/> 
     
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor="validationServer02">Firstname</label>
      <input 
      name = "firstname"
      onChange = {changeHandler}
      value = {items.items.firstname}
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
        	value = {items.items.lastname}
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
);
};

export default withRouter(App);
