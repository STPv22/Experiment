
export default function runAi(socket, db) {
    socket.send('!key keyBindForward 1');

    socket.send(`!message Start command recived from server! If this message took too long to appear,
        you should check your intertnet connection or consider self-hosting.`);
    
    
}