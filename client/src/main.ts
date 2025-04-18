ModAPI.require("player");
var settings = ModAPI.settings;
var player = ModAPI.player;

export let socket;

//hand websocket logic
function makeWebsocketConnection() {
    socket = new WebSocket(
        //Temporary, I plan to host this on render/vercel? if I ever get it done
        "ws://congenial-couscous-wr7qpjr599x7fg4rq-8080.app.github.dev/",
        [
            "protocolOne",
            "protocolTwo",
        ]
    );
    
    socket.onopen = () => {
        console.log("WebSocket connection opened");
        setInterval(() => {
            socket.send("Ping!");
        }, 3000);
    }
    
    socket.onclose = () => {
        console.log("Websocket disconnected, attemping to reconnect");
        makeWebsocketConnection();
    }
    
    if (settings.keyBindForward.pressed == 1) {
        socket.send('message from client');
    }
    
    socket.onmessage = (msg) => {
        console.log("Received message:", msg.data);
        var args = msg.data.split(" ");
        
        if (args[0] == '!key') {
            ModAPI.settings[args[1]].pressed = parseInt(args[2]);
        } else if (args[0] == '!rotate') {
            console.log(ModAPI.player);
            ModAPI.player[args[1]] = parseFloat(args[2]);
        } else if (args[0] == '!message') {
            var messsage = args.slice(1).join(" ");
            ModAPI.displayToChat(messsage);
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
        console.error("WebSocket error:", event);
    };
}
makeWebsocketConnection();

//command stuff
ModAPI.addEventListener('sendchatmessage', (event) => {
    var args = event.message.split(" ");

    if (args[0] == '.ai') {
        event.preventDefault = true;
        if (!socket) {
            makeWebsocketConnection();
        }
       switch (args[1]) {
            case 'start':
                ModAPI.displayToChat("Starting AI");
                socket.send("!start");
                break;
            default:
                ModAPI.displayToChat("Unknown command");
                break;
       }
    }
})