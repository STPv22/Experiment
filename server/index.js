import { WebSocketServer } from 'ws';
import { JSONFilePreset } from 'lowdb/node'

import runAi from './runAi.js';

// Read or create db.json
// parsedjson.runs[selectedRun][selectedStep]
const defaultData = { 
    runs: [ //each run
    ] 
}
var dataTemplate = [
    { // data for each step
        reward: 0,
        goal: {
            x: 0,
            y: 0,
            z: 0
        },
        pos: {
            x: 0,
            y: 0,
            z: 0
        },
        yaw: 0,
        pitch: 0,
        action: {
            forward: 0,
            left: 0,
            right: 0,
            back: 0,
            jump: 0,
            yawMotion: 0,
            pitchMotion: 0,
            sneak: 0, //this will not be used for now
        }
    }
]

const db = await JSONFilePreset('aiData.json', defaultData);
await db.update(({ runs }) => runs.push(dataTemplate))


const server = new WebSocketServer({ 
  port: 8080
});

server.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);

        if (message === '!start') {
            runAi(socket, db);
        }
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');