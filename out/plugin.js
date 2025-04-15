(() => {
  // src/CommandManager.ts
  function InitManager() {
    ModAPI.addEventListener("sendchatmessage", (ev) => {
      var msg = ev.message;
      function noCommand() {
        ModAPI.displayToChat("Invalid command!");
      }
      if (msg.startsWith(".")) {
        ev.preventDefault = true;
        var out = msg.split(" ");
        if (out[0] == ".ai") {
          if (out[1] == "start") {
            socket.send("!start");
            ModAPI.displayToChat("Starting AI...");
          } else {
            noCommand();
          }
        } else {
          noCommand();
        }
      }
    });
  }

  // src/Alertbox.ts
  var alertbox = document.createElement("div");
  alertbox.style.position = "absolute";
  alertbox.style.top = "0";
  alertbox.style.left = "0";
  alertbox.style.width = "30%";
  alertbox.style.height = "5rem";
  alertbox.style.color = "black";
  function alertMsg(message) {
    alertbox.innerHTML = message;
    document.body.appendChild(alertbox);
    setTimeout(() => {
      document.body.removeChild(alertbox);
    }, 5e3);
  }

  // src/main.ts
  ModAPI.require("player");
  var settings = ModAPI.settings;
  var player = ModAPI.player;
  InitManager();
  var socket = new WebSocket(
    "ws://congenial-couscous-wr7qpjr599x7fg4rq-8080.app.github.dev",
    [
      "protocolOne",
      "protocolTwo"
    ]
  );
  socket.onopen = () => {
    alertMsg("Connected to server!");
    console.log("WebSocket connection opened");
  };
  socket.onmessage = (msg) => {
    console.log("Received message:", msg.data);
    var args = msg.data.split(" ");
    if (args[0] == "!out") {
      ModAPI.settings[args[1]].pressed = parseInt(args[2]);
    } else if (args[0] == "!getdata") {
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
        pitch: player.rotationPitch
      };
      socket.send(`!data ${JSON.stringify(runData)}`);
    }
  };
  socket.onerror = (event) => {
    alertMsg("Error: " + event);
    console.error("WebSocket error:", event);
  };
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL0NvbW1hbmRNYW5hZ2VyLnRzIiwgIi4uL3NyYy9BbGVydGJveC50cyIsICIuLi9zcmMvbWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgc29ja2V0IH0gZnJvbSBcIi4vbWFpblwiO1xuXG4vL0kgZnIgbmVlZCBhIGNvbW1hbmQgbWFuYWdlciBtb2RcbmV4cG9ydCBmdW5jdGlvbiBJbml0TWFuYWdlcigpIHtcbk1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwic2VuZGNoYXRtZXNzYWdlXCIsIChldikgPT4ge1xuICAgIHZhciBtc2cgOiBzdHJpbmcgPSBldi5tZXNzYWdlO1xuXG4gICAgZnVuY3Rpb24gbm9Db21tYW5kKCkge1xuICAgICAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdCgnSW52YWxpZCBjb21tYW5kIScpO1xuICAgIH1cblxuICAgIGlmIChtc2cuc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgdmFyIG91dCA9IG1zZy5zcGxpdCgnICcpO1xuICAgICAgICBpZiAob3V0WzBdID09ICcuYWknKSB7XG4gICAgICAgICAgICBpZiAob3V0WzFdID09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZCgnIXN0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgTW9kQVBJLmRpc3BsYXlUb0NoYXQoJ1N0YXJ0aW5nIEFJLi4uJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vQ29tbWFuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9Db21tYW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbn1cblxuIiwgIlxudmFyIGFsZXJ0Ym94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmFsZXJ0Ym94LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuYWxlcnRib3guc3R5bGUudG9wID0gXCIwXCI7XG5hbGVydGJveC5zdHlsZS5sZWZ0ID0gXCIwXCI7XG5hbGVydGJveC5zdHlsZS53aWR0aCA9IFwiMzAlXCI7XG5hbGVydGJveC5zdHlsZS5oZWlnaHQgPSBcIjVyZW1cIjtcbmFsZXJ0Ym94LnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWxlcnRNc2cobWVzc2FnZSkge1xuICAgIGFsZXJ0Ym94LmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhbGVydGJveCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYWxlcnRib3gpO1xuICAgIH0sIDUwMDApO1xufSIsICJpbXBvcnQgeyBJbml0TWFuYWdlciB9IGZyb20gXCIuL0NvbW1hbmRNYW5hZ2VyXCI7XG5pbXBvcnQgYWxlcnRNc2cgZnJvbSBcIi4vQWxlcnRib3hcIjtcblxuTW9kQVBJLnJlcXVpcmUoXCJwbGF5ZXJcIik7XG52YXIgc2V0dGluZ3MgPSBNb2RBUEkuc2V0dGluZ3M7XG52YXIgcGxheWVyID0gTW9kQVBJLnBsYXllcjtcblxuSW5pdE1hbmFnZXIoKTtcbmV4cG9ydCB2YXIgc29ja2V0ID0gbmV3IFdlYlNvY2tldChcbiAgICBcIndzOi8vY29uZ2VuaWFsLWNvdXNjb3VzLXdyN3FwanI1OTl4N2ZnNHJxLTgwODAuYXBwLmdpdGh1Yi5kZXZcIixcbiAgICBbXG4gICAgICAgIFwicHJvdG9jb2xPbmVcIixcbiAgICAgICAgXCJwcm90b2NvbFR3b1wiLFxuICAgIF1cbik7XG5cbnNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XG4gICAgYWxlcnRNc2coXCJDb25uZWN0ZWQgdG8gc2VydmVyIVwiKTtcbiAgICBjb25zb2xlLmxvZyhcIldlYlNvY2tldCBjb25uZWN0aW9uIG9wZW5lZFwiKTtcbn1cblxuc29ja2V0Lm9ubWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIG1lc3NhZ2U6XCIsIG1zZy5kYXRhKTtcbiAgICB2YXIgYXJncyA9IG1zZy5kYXRhLnNwbGl0KFwiIFwiKTtcbiAgICBcbiAgICBpZiAoYXJnc1swXSA9PSAnIW91dCcpIHtcbiAgICAgICAgTW9kQVBJLnNldHRpbmdzW2FyZ3NbMV1dLnByZXNzZWQgPSBwYXJzZUludChhcmdzWzJdKTtcbiAgICB9IGVsc2UgaWYgKGFyZ3NbMF0gPT0gJyFnZXRkYXRhJykge1xuICAgICAgICB2YXIgcnVuRGF0YSA9IHtcbiAgICAgICAgICAgIGZvcndhcmQ6IHNldHRpbmdzLmtleUJpbmRGb3J3YXJkLnByZXNzZWQsXG4gICAgICAgICAgICBsZWZ0OiBzZXR0aW5ncy5rZXlCaW5kTGVmdC5wcmVzc2VkLFxuICAgICAgICAgICAgcmlnaHQ6IHNldHRpbmdzLmtleUJpbmRSaWdodC5wcmVzc2VkLFxuICAgICAgICAgICAgYmFjazogc2V0dGluZ3Mua2V5QmluZEJhY2sucHJlc3NlZCxcbiAgICAgICAgICAgIGp1bXA6IHNldHRpbmdzLmtleUJpbmRKdW1wLnByZXNzZWQsXG4gICAgICAgICAgICBzcHJpbnQ6IHNldHRpbmdzLmtleUJpbmRTcHJpbnQucHJlc3NlZCxcbiAgICAgICAgICAgIHBvc1g6IE1hdGguZmxvb3IocGxheWVyLnBvc1gpLFxuICAgICAgICAgICAgcG9zWTogTWF0aC5mbG9vcihwbGF5ZXIucG9zWSksXG4gICAgICAgICAgICBwb3NaOiBNYXRoLmZsb29yKHBsYXllci5wb3NaKSxcbiAgICAgICAgICAgIHlhdzogcGxheWVyLnJvdGF0aW9uWWF3LFxuICAgICAgICAgICAgcGl0Y2g6IHBsYXllci5yb3RhdGlvblBpdGNoLFxuICAgICAgICB9XG4gICAgICAgIHNvY2tldC5zZW5kKGAhZGF0YSAke0pTT04uc3RyaW5naWZ5KHJ1bkRhdGEpfWApO1xuICAgIH1cbn1cblxuc29ja2V0Lm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcbiAgICBhbGVydE1zZyhcIkVycm9yOiBcIiArIGV2ZW50KTtcbiAgICBjb25zb2xlLmVycm9yKFwiV2ViU29ja2V0IGVycm9yOlwiLCBldmVudCk7XG59OyJdLAogICJtYXBwaW5ncyI6ICI7O0FBR08sV0FBUyxjQUFjO0FBQzlCLFdBQU8saUJBQWlCLG1CQUFtQixDQUFDLE9BQU87QUFDL0MsVUFBSSxNQUFlLEdBQUc7QUFFdEIsZUFBUyxZQUFZO0FBQ2pCLGVBQU8sY0FBYyxrQkFBa0I7QUFBQSxNQUMzQztBQUVBLFVBQUksSUFBSSxXQUFXLEdBQUcsR0FBRztBQUNyQixXQUFHLGlCQUFpQjtBQUNwQixZQUFJLE1BQU0sSUFBSSxNQUFNLEdBQUc7QUFDdkIsWUFBSSxJQUFJLENBQUMsS0FBSyxPQUFPO0FBQ2pCLGNBQUksSUFBSSxDQUFDLEtBQUssU0FBUztBQUNuQixtQkFBTyxLQUFLLFFBQVE7QUFDcEIsbUJBQU8sY0FBYyxnQkFBZ0I7QUFBQSxVQUN6QyxPQUFPO0FBQ0gsc0JBQVU7QUFBQSxVQUNkO0FBQUEsUUFDSixPQUFPO0FBQ0gsb0JBQVU7QUFBQSxRQUNkO0FBQUEsTUFDSjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0Q7OztBQ3pCQSxNQUFJLFdBQVcsU0FBUyxjQUFjLEtBQUs7QUFDM0MsV0FBUyxNQUFNLFdBQVc7QUFDMUIsV0FBUyxNQUFNLE1BQU07QUFDckIsV0FBUyxNQUFNLE9BQU87QUFDdEIsV0FBUyxNQUFNLFFBQVE7QUFDdkIsV0FBUyxNQUFNLFNBQVM7QUFDeEIsV0FBUyxNQUFNLFFBQVE7QUFDUixXQUFSLFNBQTBCLFNBQVM7QUFDdEMsYUFBUyxZQUFZO0FBQ3JCLGFBQVMsS0FBSyxZQUFZLFFBQVE7QUFDbEMsZUFBVyxNQUFNO0FBQ2IsZUFBUyxLQUFLLFlBQVksUUFBUTtBQUFBLElBQ3RDLEdBQUcsR0FBSTtBQUFBLEVBQ1g7OztBQ1hBLFNBQU8sUUFBUSxRQUFRO0FBQ3ZCLE1BQUksV0FBVyxPQUFPO0FBQ3RCLE1BQUksU0FBUyxPQUFPO0FBRXBCLGNBQVk7QUFDTCxNQUFJLFNBQVMsSUFBSTtBQUFBLElBQ3BCO0FBQUEsSUFDQTtBQUFBLE1BQ0k7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFFQSxTQUFPLFNBQVMsTUFBTTtBQUNsQixhQUFTLHNCQUFzQjtBQUMvQixZQUFRLElBQUksNkJBQTZCO0FBQUEsRUFDN0M7QUFFQSxTQUFPLFlBQVksQ0FBQyxRQUFRO0FBQ3hCLFlBQVEsSUFBSSxxQkFBcUIsSUFBSSxJQUFJO0FBQ3pDLFFBQUksT0FBTyxJQUFJLEtBQUssTUFBTSxHQUFHO0FBRTdCLFFBQUksS0FBSyxDQUFDLEtBQUssUUFBUTtBQUNuQixhQUFPLFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRSxVQUFVLFNBQVMsS0FBSyxDQUFDLENBQUM7QUFBQSxJQUN2RCxXQUFXLEtBQUssQ0FBQyxLQUFLLFlBQVk7QUFDOUIsVUFBSSxVQUFVO0FBQUEsUUFDVixTQUFTLFNBQVMsZUFBZTtBQUFBLFFBQ2pDLE1BQU0sU0FBUyxZQUFZO0FBQUEsUUFDM0IsT0FBTyxTQUFTLGFBQWE7QUFBQSxRQUM3QixNQUFNLFNBQVMsWUFBWTtBQUFBLFFBQzNCLE1BQU0sU0FBUyxZQUFZO0FBQUEsUUFDM0IsUUFBUSxTQUFTLGNBQWM7QUFBQSxRQUMvQixNQUFNLEtBQUssTUFBTSxPQUFPLElBQUk7QUFBQSxRQUM1QixNQUFNLEtBQUssTUFBTSxPQUFPLElBQUk7QUFBQSxRQUM1QixNQUFNLEtBQUssTUFBTSxPQUFPLElBQUk7QUFBQSxRQUM1QixLQUFLLE9BQU87QUFBQSxRQUNaLE9BQU8sT0FBTztBQUFBLE1BQ2xCO0FBQ0EsYUFBTyxLQUFLLFNBQVMsS0FBSyxVQUFVLE9BQU8sQ0FBQyxFQUFFO0FBQUEsSUFDbEQ7QUFBQSxFQUNKO0FBRUEsU0FBTyxVQUFVLENBQUMsVUFBVTtBQUN4QixhQUFTLFlBQVksS0FBSztBQUMxQixZQUFRLE1BQU0sb0JBQW9CLEtBQUs7QUFBQSxFQUMzQzsiLAogICJuYW1lcyI6IFtdCn0K
