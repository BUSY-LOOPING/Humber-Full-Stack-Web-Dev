//BLOCKING CODE
console.log('Starting blocking operation...');
for (let i = 0; i < 100; i++) {
    // This is a blocking operation
    console.log(i);
}

console.log('Blocking operation completed.'); //had the loop executed asynchronously, this message would have been printed before the loop completed

//NON-BLOCKING CODE
console.log('Starting non-blocking operation...');
setTimeout(() => {
    console.log('Non-blocking operation completed.');
}, 500); //set timeout is a non-blocking operation
//it schedules the callback function to be executed after 500 milliseconds
// The main thread continues executing while waiting for the timeout
//However the timeout function will not get called (or not print in between the for loop print statements)
//this is because setTimeout schedules the callback to run after ATLEAST 500 milliseconds. It does not execute immediately. The callback is placed in the event queue and will only be executed when the main thread is free.
//Since the for loop below is still blocking the main thread, the callback will not be executed until the for loop completes.
//Since the timeout is non blocking, control moves to the next line and starts execution of the for loop

for (let i = 0; i < 100; i++) {
    // This is a blocking operation
    console.log(i);
}