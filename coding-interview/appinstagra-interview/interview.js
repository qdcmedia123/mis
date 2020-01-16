const initialState = {
	foo: [1],
	switch: false
}

function FooReducer ( state = initialState, action) {
	switch (action.type) {
		case 'SET_FOO':
		  return Object.assign({}, state, {
		  	foo: action.foo,
		  	switch: true
		  });
		 case 'PUSH_FOO':
		   return Object.assign({}, state, {
		   	foo: [
		   		...state.foo,
		   		action.foo
		   	],
		   	switch: !state.switch
		   })
		  default:
		      return state;
	}
}

// What will the state of this reducer be after the following actions 
// dispatcted
/*dispatch({type: 'SET_FOO', foo: [1,2]});
dispatch({type: 'PUSH_FOO', foo: 3});
dispatch({type: 'PUSH_FOO', foo: 6});*/



// Q. What would you use to pass data through the component tree without having to passss props manually to each level?

/*
Context provides a way to pass data through the component tree without having to pass props down manually along every level. React typically works with a top-down (parent to child) flow of data
*/

/*
 Write the body of the nextWeek(date) function that returns a date 7 days after the date given in input date is always a defined Date object.
*/

function nextWeek(date) {
	var result = new Date();
	result.setDate(result.getDate() + date);
	return result;
}

/*var d = new Date();
console.log(d);
console.log(nextWeek(5))*/

/*
 Finding twin word 
*/

function isTwing(a, b) {
	a = a.toLowerCase(), b = b.toLowerCase();

	// Split the string 
	let splitA = a.split("");
	let splitB = b.split("");

	// Both length must be same 
	if(splitA.length !== splitB.length) return false;

	// Loop splitA
	const isTwin = splitA.filter(value => -1 !== splitB.indexOf(value));
	
	// return true if its array of false 
	return Array.isArray(isTwin) ? true : false;
}

/*const a = 'Slient';
const b = 'Listen';

console.log(isTwing(a, b))*/


/*
For example 34 is followed by 41 (as 41 = 34 + (3 + 4)). 41 is itself followed by 46(46 = 41 + (4 + 1))
*/
// same number pluse the sum of it's digit, join a given point 
/*
	We consider the sequence of numbers where a number is followed by the same number pluse the sum of its digits 
*/

// Two number join at given point 

