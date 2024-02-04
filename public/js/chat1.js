const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const roomName = "testRoom1";
  socket.emit("join room", roomName);

  const messageForm = document.getElementById("messageForm");
  const messageInput = document.getElementById("messageInput");

  messageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = messageInput.value.trim();
      if (message) {
          socket.emit("private message", { roomId: roomName, message: message });
          messageInput.value = "";
      }
  });

  socket.on("private message", (message) => {
      const chatMessages = document.getElementById("chatMessages");
      const messageElement = document.createElement("div");
      messageElement.innerText = message;
      chatMessages.appendChild(messageElement);
  });
});
