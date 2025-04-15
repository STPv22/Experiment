import { InitManager } from "./CommandManager";
import alertMsg from "./Alertbox";

ModAPI.require("player");
var settings = ModAPI.settings;
var player = ModAPI.player;

InitManager();
export var socket = new WebSocket(
    "ws://congenial-couscous-wr7qpjr599x7fg4rq-8080.app.github.dev",
    [
        "protocolOne",
        "protocolTwo",
    ]
);

socket.onopen = () => {
    alertMsg("Connected to server!");
    console.log("WebSocket connection opened");
}

socket.onmessage = (msg) => {
    console.log("Received message:", msg.data);
    var args = msg.data.split(" ");
    
    if (args[0] == '!out') {
        ModAPI.settings[args[1]].pressed = parseInt(args[2]);
    } else if (args[0] == '!getdata') {
        var runData = {
            forward: settings.keyBindForward.pressed,
            left: settings.keyBindLeft.pressed,
            right: settings.keyBindRight.pressed,
            back: settings.keyBindBack.pressed,
            jump: settings.keyBindJump.pressed,
            sprint: settings.keyBindSprint.pressed,
            posX: Math.floor(player.posX),
            posY: Math.floor(player.posY),
            posZ: Math.floor(player.posZ),
            yaw: player.rotationYaw,
            pitch: player.rotationPitch,
        }
        socket.send(`!data ${JSON.stringify(runData)}`);
    }
}

socket.onerror = (event) => {
    alertMsg("Error: " + event);
    console.error("WebSocket error:", event);
};