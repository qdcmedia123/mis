import React, { useState, useEffect} from 'react';
import axios from 'axios';

import UserTable from './UserTable';

// We will be deleting user here 


function App() {
	
	const [items, setItem] = useState({items: {}})
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		
		const fetchItems = async() => {
			
			try{

				setIsLoading(true);

				const result = await axios('/api/crud/read');

				setItem(result.data);

				setIsLoading(false);

			} catch(error) {
				console.log(error);
			}
			
		};
		fetchItems();
	}, [])


	const delteUser = (id) => {  

	axios.delete('/api/crud/delete', {data: {id:id}}).then(function (response) {

		if(response.status === 200) {

			window.location.reload();
		}
	})

	}

	//  Send the axios request
	return (
			<div>

			{Object.keys(items).length > 0 ? (
				isLoading === false ? (<div><UserTable users = {items}  deleteUser = {delteUser}/></div>) : (<div>Loading....</div>)
				
			) : (<div>No Data Avaialbe</div>)}			
			</div>
		);

}


export default App;