<?php
$array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14, 15];
shuffle($array);

$pieces = array_chunk($array, ceil(count($array) / 3));


list($array1, $array2) = array_chunk($array, ceil(count($array) / 2));


// Another way 

$howMany = 3;
$perarray = count($array) / $howMany;

$ar = [];

for($i = 0; $i < $howMany; $i++) {

	$ar[] = array_slice($array, $i * $perarray, 5);
}

