import { initServer } from './network/ServerHandler';

export var socket = initServer();

ModAPI.addEventListener('sendchatmessage', (event) => {
    if (event.message.startsWith('.')) {
        event.preventDefault();
       
        if (event.message === '.p') {
            
        }
    }
});