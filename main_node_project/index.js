const { exec } = require('child_process');

const portfinder = require('portfinder');


portfinder.getPort((err, port) => {
    if (err) {
        console.error('Error finding port:', err);
        return;
    }

    const startingPort = port; 

var scriptSystem = exec(`node D:/Lakmali/DC_Project/system_node_project/index.js ${startingPort}`, 
        (error, stdout, stderr) => {
            console.log(stdout,"stdout1");
            console.log(stderr,"stderr1");
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
    });

})