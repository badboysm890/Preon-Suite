const io = require('socket.io-client');
const { Go1, Go1Mode } = require("@droneblocks/go1-js");
const deasync = require('deasync');

const socket = io('http://localhost:5005');  // Replace with your Python server URL

function sleep(ms) {
  let done = false;
  setTimeout(() => { done = true; }, ms);
  deasync.loopWhile(() => !done);
}

let dog = new Go1();
dog.init();

socket.on('connect', () => {
  console.log('Connected to Python server');
  console.log("standing up")
  dog.setMode(Go1Mode.standUp);
  console.log('Sleeping for 3 seconds');
  sleep(1000);
});

socket.on('disconnect', () => {
  console.log('Disconnected from Python server');
  console.log("standing down")
  dog.setMode(Go1Mode.standDown);
  console.log('Sleeping for 3 seconds');
  sleep(1000);
  console.log("damping")
  dog.setMode(Go1Mode.damping);
});

socket.on('command', (message) => {
  console.log(`Received: ${message}`);
  
  switch (message) {
    case 'listening':
      // set LEd to Green
      dog.setLedColor(0, 0, 255);
      sleep(2000)
    case 'standUp':
      dog.setMode(Go1Mode.standUp);
      sleep(1000)
      dog.setMode(Go1Mode.walk);
      sleep(1000);
      dog.setMode(Go1Mode.standDown);
      sleep(3000);
      dog.setMode(Go1Mode.damping);
      // set LEd to Green
      dog.setLedColor(0, 255, 0);
      sleep(1000)
      dog.setLedColor(1, 0, 0);
      break;
    case 'walk':
      dog.setMode(Go1Mode.standUp);
      sleep(1000)
      dog.setMode(Go1Mode.walk);
      sleep(1000);
      break;
    case 'goForward':
      dog.setMode(Go1Mode.standUp);
      sleep(1000)
      dog.setMode(Go1Mode.walk);
      sleep(1000);
      dog.goForward(0.1, 500);
      sleep(1000);
      break;
    case 'goBackward':
      dog.setMode(Go1Mode.standUp);
      sleep(1000)
      dog.setMode(Go1Mode.walk);
      sleep(1000);
      dog.goBackward(0.1, 500);
      sleep(1000);
      break;
    case 'turnLeft':
      dog.setMode(Go1Mode.standUp);
      sleep(1000)
      dog.setMode(Go1Mode.walk);
      sleep(1000);
      dog.turnLeft(0.1, 500);
      sleep(1000);
      break;
    case 'turnRight':
      dog.setMode(Go1Mode.standUp);
      sleep(1000)
      dog.setMode(Go1Mode.walk);
      sleep(1000);
      dog.turnRight(0.1, 500);
      sleep(1000);
      break;
    case 'sitDown':
      dog.setMode(Go1Mode.standDown);
      sleep(1000);
      dog.setMode(Go1Mode.damping);
      sleep(1000);
      break;
    case 'damping':
      dog.setMode(Go1Mode.standDown);
      sleep(1000);
      dog.setMode(Go1Mode.damping);
      sleep(1000);
      break;
    case 'hi':
      dog.setMode(Go1Mode.standUp);
      sleep(1000)
      dog.setMode(Go1Mode.walk);
      sleep(1000);
      dog.setMode(Go1Mode.straightHand1);
      sleep(1000);
      break;
    default:
      console.log('Unknown command');
      // led to red
      dog.setLedColor(255, 0, 0);
      sleep(1000);
      break;
  }
});
