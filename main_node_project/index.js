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

  var scriptSystem = exec(`node D:/Lakmali/DC_Project/system_node_project/index.js ${startingPort}`,

    (error, stdout, stderr) => {
      console.log(stdout, "stdout1");
      console.log(stderr, "stderr1");
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    });

  class Node {
    constructor(id, name) {
      this.id = id;
      this.name = name;
      this.port = port;
      this.sidecarPort = port + 5;
      this.nodeTable = [];
      this.valueTable = {};
      this.role = '';
    }

    joinNetwork(nodes) {

      this.name = this.generateRandomName();
      this.decideRole(nodes);
      nodes.forEach(node => {

        if (node !== this) {
          this.port = this.port + 1;
          const reply = this.sendBroadcast(node);
          this.updateNodeTable(reply);
        }
        const randomKey = generateRandomKey();
        const randomValue = generateRandomValue();

        // Insert the random data into the node
        node.insertData(randomKey, randomValue);

      });

      console.log("nodeTable", this.nodeTable);
    }

    generateRandomName() {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      let randomName = '';
      for (let i = 0; i < 10; i++) {
        randomName += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return randomName;
    }

    sendBroadcast(node) {
      return {
        id: node.id,
        name: node.name,
        port: node.port,
        role: node.role
      };
    }

    updateNodeTable(reply) {

      this.nodeTable.push(reply);
    }

    decideRole(nodes) {
      const numNodes = nodes.length;
      this.role = numNodes % 2 === 0 ? 'hasher' : 'receiver';
    }

    insertData(key, value) {
      if (this.role === 'hasher') {
        const hashValue = this.calculateHash(value);
        const receiverId = hashValue % this.nodeTable.length;
        const receiver = this.nodeTable.find(node => node.id === receiverId);
        // console.log("receiver", key,"value",value);
        this.receiveData(key, receiver);
      } else {
        // Store the data locally for receiver nodes
        this.valueTable[key] = value;
        console.log(`Data inserted successfully at node ${this.id}`);
        console.log("valueTable", this.valueTable);
      }
    }

    calculateHash(str) {
      // Calculate the sum of values of first 10 characters
      let sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += str.charCodeAt(i);
      }
      // Modulus by 5 as specified
      return sum % 5;
    }

    receiveData(key, value) {
      // Store the first 10 characters as the key and the entire string as the value
      const hashKey = key.substring(0, 10);
      this.valueTable[hashKey] = value;
      console.log(`Data received and stored successfully at node ${this.id}`);
    }

    retrieveData(key) {

      if (this.role === 'receiver') {

        // Relay retrieval request to a hasher node
        const hasher = this.nodeTable.find(node => node.role === 'hasher');

        hasher.retrieveData(key);

      } else {
        // Retrieve data locally for hasher nodes
        const data = this.valueTable[key];
        if (data) {
          console.log(`Data found at node ${this.id}:`, data);
        } else {
          console.log(`Data not found for key '${key}'`);
        }
      }
    }

    joinSidecarNetwork(nodesSideCars) {

      this.name = this.generateRandomName();
      this.decideRole(nodesSideCars);
      nodesSideCars.forEach(nodesSide => {

        if (nodesSide !== this) {
          this.nodesSide = this.nodesSide + 1;
          const reply = this.sendBroadcast(nodesSide);
          this.updateNodeTable(reply);
        }
        const randomKey = generateRandomKey();
        const randomValue = generateRandomValue();

        // Insert the random data into the node
        nodesSide.insertData(randomKey, randomValue);
          return nodesSide;
      });
    
    }

  }

  function simulateSidecarNetwork(numNodes) {
    const nodesSideCars = [];
    for (let i = 0; i < numNodes; i++) {

      const node = new Node(i, `Node${i}`);
      nodesSideCars.push(node);
      node.joinSidecarNetwork(nodesSideCars);

    }
    return nodesSideCars;
  }

  const nodesSideCars = simulateSidecarNetwork(5);
  
  const nodesSide = startingPort + 5;

  var scriptSystem2 = exec(`node D:/Lakmali/DC_Project/system_sidecar_project/index.js ${nodesSide}`,
    (error, stdout, stderr) => {
      console.log(stdout, "stdout2");
      console.log(stderr, "stderr2");
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    });
  
  function generateRandomKey() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let randomKey = '';
    for (let i = 0; i < 10; i++) {
      randomKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomKey;
  }

  function generateRandomValue() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomValue = '';
    for (let i = 0; i < 20; i++) { // Adjust the length of the random value as needed
      randomValue += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomValue;
  }

  function simulateNetwork(numNodes) {
    const nodes = [];
    for (let i = 0; i < numNodes; i++) {
      const node = new Node(i, `Node${i}`);
      nodes.push(node);
      node.joinNetwork(nodes);

    }
    // console.log("nodes", nodes);
    return nodes;
  }
  const nodes = simulateNetwork(5);


})