const args = process.argv;

// Skipping the first two default arguments (node and the script filename)
const passedArgs = args.slice(2);

// Assuming that you're passing a single variable value
const variableValue = passedArgs[0];

console.log("Passed variable value:", variableValue);
