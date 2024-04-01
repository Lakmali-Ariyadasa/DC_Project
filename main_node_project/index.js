const {
  exec
} = require('child_process');
const portfinder = require('portfinder');
const http = require('http');

portfinder.getPort((err, port) => {
  if (err) {
    console.error('Error finding port:', err);
    return;
  }

  const startingPort = port;
  // findNextFivePorts(startingPort);

  var scriptSystem = exec(`node D:/Lakmali/DC_Project/system_node_project/index.js ${startingPort}`,
    (error, stdout, stderr) => {
      console.log(stdout, "stdout1");
      console.log(stderr, "stderr1");
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    });

  // Function to find and start the next five available ports
  // function findNextFivePorts(startingPort) {
  //     const numberOfPorts = 5;
  //     let currentPort = startingPort;

  //     for (let i = 0; i < numberOfPorts; i++) {
  //         portfinder.getPort({
  //             port: currentPort
  //         }, (err, startingPort) => {
  //             if (err) {
  //                 console.error('Error finding port:', err);
  //                 return;
  //             }
  //             startServer(startingPort);
  //         });

  //         // Increment currentPort for the next iteration
  //         currentPort++;
  //     }
  // }

  class Node {
    constructor(id, name, port) {
      this.id = id;
      this.name = name;
      this.port = port;
      this.nodeTable = [];
      this.valueTable = {};
      this.role = '';
    }


    joinNetwork(nodes) {
      this.name = this.generateRandomName();
      this.decideRole(nodes);
      this.nodeTable = nodes.filter(node => node !== this).map(node => ({
        id: node.id,
        name: node.name,
        port: node.port,
        role: node.role
      }));

      // console.log("this.nodeTable", this.nodeTable);
    }

    generateRandomName() {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      let randomName = '';
      for (let i = 0; i < 10; i++) {
        randomName += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return randomName;
    }

    decideRole(nodes) {
      const numNodes = nodes.length;
      this.role = numNodes % 2 === 0 ? 'hasher' : 'receiver';
    }


  }


  function findNextFivePorts(startingPort) {
    const numberOfPorts = 5;
    const nodes = [];
    let currentPort = startingPort;

    for (let i = 0; i < numberOfPorts; i++) {
      const node = new Node(i, `Node${i}`, currentPort++);
      nodes.push(node);
      node.joinNetwork(nodes);
      startServer(currentPort);
      console.log("nodeTable", node.nodeTable);
    }

    // console.log("nodes", nodes);

    return nodes;

  }
  const nodes = findNextFivePorts(startingPort);

  // Function to start a server on a specified port
  function startServer(startingPort) {
    const server = http.createServer((req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end(`Server running on port ${startingPort}\n`);
    });

    server.listen(startingPort, () => {
      console.log(`Server is running on http://localhost:${startingPort}`);
    });
  }
})