const args = process.argv;

// Skipping the first two default arguments (node and the script filename)
const passedArgs = args.slice(2);

// Assuming that you're passing a single variable value
const nodeValue = passedArgs[0];

console.log("Passed variable value:", nodeValue);

let nodeTable = [];
let valueTable = {};

  
const  nodeName  = nodeValue;

const newNode = { nodeName };
  
  nodeTable.push(newNode);

// Determine role based on the number of nodes
  
  if (nodeTable.length % 2 === 0) {
      newNode.role = 'hasher';
       
  } else {
      newNode.role = 'receiver';
    
  }
console.log("nodeTable", nodeTable);
//   console.log(`Node ${nodeName} with ID ${nodeId} joined as ${newNode.role}`);
