import { addToArray, getArrayLength } from "./module.js";

//addToArray and getArrayLength functions were named exported from module.js
console.log('Initial array length:', getArrayLength()); // Initial array length: 5

addToArray('grapes'); // addToArray function adds 'grapes' to the array
console.log('Array length after adding grapes:', getArrayLength()); // Array length after adding grapes: 6