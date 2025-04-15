import { socket } from "./main";

//I fr need a command manager mod
export function InitManager() {
ModAPI.addEventListener("sendchatmessage", (ev) => {
    var msg : string = ev.message;

    function noCommand() {
        ModAPI.displayToChat('Invalid command!');
    }

    if (msg.startsWith('.')) {
        ev.preventDefault = true;
        var out = msg.split(' ');
        if (out[0] == '.ai') {
            if (out[1] == 'start') {
                socket.send('!start');
                ModAPI.displayToChat('Starting AI...');
            } else {
                noCommand();
            }
        } else {
            noCommand();
        }
    }
});
}

