import React, {useState, useEffect} from 'react';
import Geosuggest from 'react-geosuggest';
import axios from 'axios';

import '../../assets/css/geolocation.css';

function App() {

	const [location, setLocation ] = useState({});
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState(true);
	const [errors, setErrors] = useState({});
	const [axiosRequest, setAxiosRequest] = useState(null);
	const [data, setData] = useState({});

	useEffect(() => {
    // Update the document title using the browser API
    	setLoading(false);
  });

	const handleGeosuggestChange = (value) =>  {
      
  		setLocation({...location, locate_your_car: value});
	}

	const handleGeosuggestSuggest = el => {

	  //el.preventDefault();
	  if(typeof el !== 'undefined') {

	     setLocation({...location, location: { description: el.label || null, location: el.location || null}});
	  }
  	}

  	// Send axious 

	const submitHandler = event => {

		event.preventDefault();		
		if(Object.keys(location).length > 0) {

			setAxiosRequest(true);

			setErrors({location});

			const {lat, lng } = location.location.location;
			

			// From url 
			const url = `/api/crud/weather?lat=${lat}&lon=${lng}`;
			// Send axios request 

			axios.get(url).then(function (response) {

				 console.log(response.data);
				 console.log(JSON.stringify(response.data));
				 setAxiosRequest(false);
				 setData(response.data)

			}).catch(function (err) {
				console.log(err.response.data);
				console.log(err.response.status);
				console.log(err.response.headers);
			})
		 	
		} else {

			// Set error 
			setErrors({location: 'Please select the location.'});

		}
	}
	return (	
				<div>
				{loading ? <div> Loading....</div> : <div> 

					<div className="row">
						<div className="container">
						        With React Version {React.version}
						       <form
						          className="needs-validation"
						          onSubmit={submitHandler}
						          noValidate
        						>
						            <div className="form-row">
						                <div className="col-md-6 text-left">
						                    <label htmlFor="location" className="grey-text float-left">Select City</label>

						                    <Geosuggest 
						                    		id = "location" 
						                    		name="location" 
						                    		value={ location.location} 
						                    		placeholder="Locate your product.." 
						                    		initialValue="" 
						                    		onChange={handleGeosuggestChange} 
						                    		onSuggestSelect={ handleGeosuggestSuggest} 
						                    		radius="20" 
						                    		location={new window.google.maps.LatLng(53.558572, 9.9278215)} 
						                    		autoComplete="" 
						                    		/>

						                    
						                </div>

						                <div className="col-md-12">
						                    <button type="submit" className="btn btn-primary float-left">Get Info</button>
						                </div>



						            </div>


						       	<div className = "col-md-12 fetch_result text-left">
						       		{axiosRequest === null ? (<div></div>) : <div>
						       				{ axiosRequest ? (<div>Please wail while loading....</div>) : (<div>
						       						{ Object.keys(data).length > 0 ? <div>
						       								<table className ="table">
															    <tbody>
															        
															        <tr>
															          <th>Tempreture</th>
															            <td>{data.main.temp}</td>
															            
															        </tr>
															        <tr>
															          <th>Pressure</th>
															            <td>{data.main.pressure}</td>
															           
															        </tr>
															      <tr>
															          <th>Humadity</th>
															          	<td>{data.main.humidity}</td>
															           
															        </tr>

															        <tr>
															          <th>Min Tempreture</th>
															          	<td>{data.main.temp_min}</td>
															           
															        </tr>

															         <tr>
															          <th>Max Tempreture</th>
															          	<td>{data.main.temp_max}</td>
															           
															        </tr>



															    </tbody>
															</table>
						       						</div> : <div> No data is available</div>}
						       				</div>)}
						       		</div>}
						       	</div>

						        </form>
						    </div>
						</div>
				</div>}
				</div>
			);
}

export default App;