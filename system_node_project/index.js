const http = require('http');

const args = process.argv;

// Skipping the first two default arguments (node and the script filename)
const passedArgs = args.slice(2);

// Assuming that passing a single variable value
const nodeValue = passedArgs[0];

console.log("Passed variable value:", nodeValue);

 // Function to start a server on a specified port

      
const server = http.createServer((req, res) => {
      console.log(`date:[${new Date().toISOString()}] ${req.method} ${req.url}`);
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(`Server running on port ${nodeValue}\n`);
    });

    server.listen(nodeValue, () => {
      console.log(`Server is running on http://localhost:${nodeValue}`);
    });

