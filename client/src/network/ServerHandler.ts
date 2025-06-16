
export function initServer() {
    const socket = new WebSocket("ws://congenial-couscous-wr7qpjr599x7fg4rq-8080.app.github.dev");

    socket.addEventListener("open", () => {
    console.log("WebSocket connection established.");
    });

    socket.addEventListener("close", () => {
    console.log("WebSocket connection closed.");
    });

    return socket;
}