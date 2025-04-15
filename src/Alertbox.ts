
var alertbox = document.createElement("div");
alertbox.style.position = "absolute";
alertbox.style.top = "0";
alertbox.style.left = "0";
alertbox.style.width = "30%";
alertbox.style.height = "5rem";
alertbox.style.color = "black";
export default function alertMsg(message) {
    alertbox.innerHTML = message;
    document.body.appendChild(alertbox);
    setTimeout(() => {
        document.body.removeChild(alertbox);
    }, 5000);
}