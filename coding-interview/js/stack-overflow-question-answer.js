function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}


/*
 * NodeJS - Subtract array from array, not removing all duplicates [duplicate]
 * */
Array.prototype.subtract = function (array) {
    array = array.slice();
    return this.filter(function (a) {
       var p = array.indexOf(a);
       if (p === -1)  {
           return true;
       }
       array.splice(p, 1);
    });
}

var a = [1, 2, 2, 3, 3, 3],
    b = [1, 2, 3];

console.log(a.subtract(b));


/*
 * Create ArrayList from array
 * */
 
var array = [];


array.push(value);


/*
 * Compare two objects in jQuery and get the difference [duplicate]
 * */


var origArray = [{
    "Name": "Single",
    "URL": "xxx",
    "ID": 123
},
{
    "Name": "Double",
    "URL": "yyy",
    "ID":  345
},
{
    "Name": "Family",
    "URL": "zzz",
    "ID": 567
}];


var destArray = [{
    "Name": "Single",
    "URL": "xxx",
    "ID": 123
},
{
    "Name": "Double",
    "URL": "yyy",
    "ID":  888
},
{
    "Name": "Family",
    "URL": "zzz",
    "ID": 567
}];



function objDiff(array1, array2) {
    var resultArray = []

    array2.forEach(function(destObj) {
        var check = array1.some(function(origObj) {
            if(origObj.ID == destObj.ID) return true
        })
        if(!check) {
            destObj.desc = 'missing in source'
            resultArray.push(destObj)
        }
    })

    array1.forEach(function(origObj) {
        var check = array2.some(function(destObj) {
            if(origObj.ID == destObj.ID) return true
        })
        if(!check) {
            origObj.desc = 'missing in destination'
            resultArray.push(origObj)
        }
    })

    return resultArray
}



/* 
 * How can I merge properties of two JavaScript objects dynamically?
 * */
 
 let merged = {...obj1, ...obj2};

/** There's no limit to the number of objects you can merge.
 *  Later properties overwrite earlier properties with the same name. */
const allRules = {...obj1, ...obj2, ...obj3};


/* For the case in question, you would do: */
Object.assign(obj1, obj2);

/** There's no limit to the number of objects you can merge.
 *  All objects get merged into the first object. 
 *  Only the object in the first argument is mutated and returned.
 *  Later properties overwrite earlier properties with the same name. */
const allRules = Object.assign({}, obj1, obj2, obj3, etc);


/*
 * Sort array of objects by string property value
 * 
 * */
 
 var objs = [ 
    { first_nom: 'Lazslo', last_nom: 'Jamf'     },
    { first_nom: 'Pig',    last_nom: 'Bodine'   },
    { first_nom: 'Pirate', last_nom: 'Prentice' }
];

function compare(a,b) {
  if (a.last_nom < b.last_nom)
    return -1;
  if (a.last_nom > b.last_nom)
    return 1;
  return 0;
}

objs.sort(compare);


/*
 * 
 * 
 * */

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

var array1 = ["Vijendra","Singh"];
var array2 = ["Singh", "Shakya"];
    // Merges both arrays and gets unique items
var array3 = arrayUnique(array1.concat(array2));



/*
 * Get all unique values in a JavaScript array (remove duplicates)
 * */

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

// usage example:
var a = ['a', 1, 'a', 2, '1'];
var unique = a.filter( onlyUnique ); // returns ['a', 1, 2, '1']


/*
 * How to remove item from array by value?
 * 
 * */

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var ary = ['three', 'seven', 'eleven'];

ary.remove('seven');

/*  returned value: (Array)
three,eleven
*/


/*
 * How can I add new array elements at the beginning of an array in Javascript?
 * */

var a = [23, 45, 12, 67];
a.unshift(34);
console.log(a); // [34, 23, 45, 12, 67]


/*
 * 
 * Remove duplicate values from JS array [duplicate]
 * */

function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}

var names = ["Mike","Matt","Nancy","Adam","Jenny","Nancy","Carl"];

remove_duplicates(names);


/*
 * Check if every element in one array is in a second array
 * 
 * */
 
 function superbag(sup, sub) {
    sup.sort();
    sub.sort();
    var i, j;
    for (i=0,j=0; i<sup.length && j<sub.length;) {
        if (sup[i] < sub[j]) {
            ++i;
        } else if (sup[i] == sub[j]) {
            ++i; ++j;
        } else {
            // sub[j] not in sup, so sub not subbag
            return false;
        }
    }
    // make sure there are no elements left in sub
    return j == sub.length;
}



/*
 * Check if an array is subset of another array
 * 
 * */
 
var PlayerOne = ['B', 'C', 'A', 'D'];
var PlayerTwo = ['D', 'C'];


var su = !PlayerTwo.some(val => PlayerOne.indexOf(val) === -1);

console.log(su)


/*

How do I check if an array includes an object in JavaScript?

*/

['joe', 'jane', 'mary'].includes('jane');
// true 

/*
NodeJS - Subtract array from array, not removing all duplicates [duplicate]
*/

Array.prototype.subtract = function (array) {
    array = array.slice();
    return this.filter(function (a) {
       var p = array.indexOf(a);
       if (p === -1)  {
           return true;
       }
       array.splice(p, 1);
    });
}

var a = [1, 2, 2, 3, 3, 3],
    b = [1, 2, 3];


/*
compare 2 arrays so that if one array has elements within the other array these elements are eliminated from the other array? [duplicate]
Ask Question
*/

for (var i in array1) {
    for (var j in array2) {
        if (array2[j] == array1[i]) {
            array2.splice(j, 1);
            break;
        }
    }
}


/* How can I merge properties of two JavaScript objects dynamically? */

let merged = {...obj1, ...obj2};

/** There's no limit to the number of objects you can merge.
 *  Later properties overwrite earlier properties with the same name. */
const allRules = {...obj1, ...obj2, ...obj3};


/*

Removing arrays from other arrays [duplicate]

*/

var a = [
                [2823832908, 10071920], 
                [5384625228, 10924221], 
                [8488934028, 313411415], 
                [2823828588, 10071580], 
                [5224682868, 14919881], 
                [8155986228, 560217208], 
                [3458951628, 10071570], 
                [6382592388, 25064430], 
                [5021452668, 10924221], 
                [8827673748, 59397160], 
                [8647215588, 26343621]
];

    b = [
        [8488934028, 313411415], 
        [8647215588, 26343621]
    ]; 


    var result = [];
    a.forEach(
        function(elem,idx,arr)
        {
            var sig = JSON.stringify(elem);
            var match = false;
            for(var i=0;i<b.length;i++)
            {
                if(sig == JSON.stringify(b[i]))
                   {
                     match = true;
                     break;
                   }
            }
            if(match === false)
                {
                    result.push(elem);
                }
        }
        );

     console.log(result); 


/*
Sort/intersect two arrays into two new ones. [duplicate]
*/

var currentList = ['Daniel', 'Lara', 'Horst'];
var newList = ['Mario', 'Lara'];

var toDelete = [];
var toAdd = [];
for(var i=0;i<newList.length;i++){
    if(currentList.indexOf(newList[i]) >-1)
        toAdd.push(newList[i])
}

for(var i=0;i<currentList.length;i++){
   if(newList.indexOf(currentList[i]) == -1)
       toDelete.push(currentList[i]);
}

console.log('dele',toDelete);
console.log('add',toAdd);


/*
How can I remove values from an array that are in another array without making a big long function? [duplicate]
*/

var arr1 = ["how", "can", "i", "remove", "values", "from", "an", "array", "that", "are", "in", "another", "array"];

var arr2 = ["can", "i", "an", "are", "in"];

var arr3 = arr1.filter( function(a) {
    return arr2.indexOf( a ) == -1;
});
console.log( arr3 );



/*
Javascript arrays: remove all elements contained in another array
*/

// If I have this array:
var myArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

// and this one:
var toRemove = ['b', 'c', 'g'];

//Use the Array.filter() method:

myArray = myArray.filter( function( el ) {
  return toRemove.indexOf( el ) < 0;
} );

//Small improvement, as browser support for Array.includes() has increased:

myArray = myArray.filter( function( el ) {
  return !toRemove.includes( el );
} );


//Next adaption using arrow functions:

myArray = myArray.filter( ( el ) => !toRemove.includes( el ) );


/*
Subtracts values one list from another in javascript
*/


var a = [1, 2, 2, 2, 5];
var b = [2];
var bDict = b.reduce(function(d, n) {
  d[n] = true;
  
  return d;
}, Object.create(null));

var result = a.filter(function(n) {
  return !bDict[n];
});

console.log(result);


/*
How to extend an existing JavaScript array with another array, without creating a new array
*/

Array.prototype.push.apply(a,b)


/*
Compare 2 arrays which returns difference
*/

var array1 = [1, 2, 3, 4, 5, 6];
var array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var difference = [];

jQuery.grep(array2, function(el) {
        if (jQuery.inArray(el, array1) == -1) difference.push(el);
});

//alert(" the difference is " + difference);​ // Changed variable name 

/*
How to use underscore's “intersection” on objects?
*/


_.intersectionObjects = function(array) {
    var slice = Array.prototype.slice; // added this line as a utility
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        //return _.indexOf(other, item) >= 0;
        return _.any(other, function(element) { return _.isEqual(element, item); });
      });
    });
  };


/* Comparing two arrays in Javascript */

function matches(outer) {
  return function (el) {
    if (outer.length !== el.length) return false;
    return el.every(function (x) {
      return outer.indexOf(x) > -1;
    });
  }
}

//Iterate over y and return a list of arrays that aren't in x.

function finder(x, y) {
  return y.filter(function (el) {
    return !x.some(matches(el));
  });
}

finder(x, y);


/*
How do I get the difference between an associative array and a regular array in Javascript?
*/

array1 = [5, 1, 3];
array2 = {1: 15, 2: 20, 3: 10, 4: 5, 5: 50};

var result = {};
for (var i in array2) {
    if (array1.indexOf(+i) < 0) {
        result[i] = array2[i];
    }
}

alert(JSON.stringify(result));

// https://www.npmjs.com/package/jQuery

/* How to determine if object is in array [duplicate] */

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}


var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];

var i,j,temparray = [],chunk = 10;

for (i=0,j=array.length; i<j; i+=chunk) {

    temparray.push(array.slice(i,i+chunk));
    // do whatever
}


console.log(temparray);

 //result = groupPlayers(arr,3);
//console.log(result);
