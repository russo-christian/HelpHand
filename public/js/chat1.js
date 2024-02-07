const socket = io();
let i = 0;
let j = 1;

document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("logged-email");
  console.log(email);

  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");

  const chatMessages = document.getElementById("main-container");

  let name;

  // Fetch user details
  fetch(`/api/users/profile/${email}`)
    .then((response) => response.json())
    .then((user) => {
      fname.innerHTML = `${user.firstName}`;
      lname.innerHTML = `${user.lastName}`;
      name = user.username;
      console.log(user);

      console.log(name);
      const roomName = "testRoom1";
      socket.emit("join room", roomName);

      const messageForm = document.getElementById("messageForm");
      const messageInput = document.getElementById("messageInput");

      const browse = document.getElementById("browse");
      if (user.seeker === true) {
        browse.addEventListener("click", function () {
          window.location.href = "/browse-task";
        });
      } else if (user.seeker === false) {
        browse.addEventListener("click", function () {
          window.location.href = "/browse-task1";
        });
      }

      messageForm.addEventListener("click", (e) => {
        i = i + j;
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
          socket.emit("private message", {
            roomId: roomName,
            message: message,
            sender: email,
            fname: name,
          });
          messageInput.value = "";
        }
      });
    })
    .catch((error) => console.error("Error fetching user details:", error));

  socket.on("private message", (message, sender, fname) => {
    const messageElement = document.createElement("div");
    messageElement.className = "light-mode-child1";

    const messageElement1 = document.createElement("div");
    messageElement1.className = "light-mode-child12";

    const brk = document.createElement("br");

    // Add additional styling based on sender or receiver
    if (sender === email) {
      i++;
      messageElement.classList.add("sender-message");
      messageElement.innerHTML = `<strong>${fname}:</strong> ${message}`;
      messageElement.style.top = `${i * 75}px`;
      chatMessages.appendChild(messageElement);
    } else {
      messageElement1.classList.add("receiver-message");
      messageElement1.innerHTML = `<strong>${fname}:</strong> ${message}`;
      messageElement1.style.top = `${(j + i) * 75}px`;
      chatMessages.appendChild(messageElement1);
      j = j + i;
    }
  });
});

const profileIcon = document.getElementById("profile-icon");

profileIcon.addEventListener("click", function () {
  window.location.href = "/profile";
});
