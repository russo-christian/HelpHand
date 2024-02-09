document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login-button");
  const profileIcon = document.getElementById("profile-icon");

  loginButton.addEventListener("click", function () {
    window.location.href = "/login1";
  });

  profileIcon.addEventListener("click", function () {
    window.location.href = "/profile";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const floatingWindow = document.getElementById("floating-window");
  floatingWindow.style.display = "none";

  const loginButton = document.getElementById("login-button");
  const profileIcon = document.getElementById("profile-icon");
  const inner = document.getElementById("inner");
  const groupdiv = document.getElementById("group");

  // Check if there is a token in localStorage on page load
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    // User is logged in, show the profile icon and hide the login button
    if (profileIcon) profileIcon.style.display = "block";
    if (loginButton) {
      loginButton.style.display = "none";
      inner.style.display = "none";
    }
    if (groupdiv) groupdiv.style.display = "none";
  } else {
    // User is not logged in, show the login button and hide the profile icon
    if (profileIcon) profileIcon.style.display = "none";
    if (groupdiv) groupdiv.style.display = "block";
    if (loginButton) {
      loginButton.style.display = "block";
      inner.style.display = "block";
    }
  }

  const email = localStorage.getItem("logged-email");
  console.log(email);

  fetch(`/api/users/profile/${email}`)
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
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
    })
    .catch((error) => console.error("Error fetching user details:", error));

  fetch(`/api/tasks`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((tasks) => {
      const storedId = localStorage.getItem("ID");
      const id = storedId ? JSON.parse(storedId) : [];
      console.log(id);
      console.log(tasks);

      tasks.forEach((task) => {
        for (let i = 0; i <= id.length; i++) {
          if (task._id === id[i]) {
            console.log("ID Matched");
            taskDisplay(task, i);
          }
        }
      });
    })
    .catch((error) => console.error("Error fetching task:", error));
});

// Closing floating window
function closeFloatingWindow() {
  const floatingWindow = document.getElementById("floating-window");
  floatingWindow.style.display = "none";
}

// Task display function
function taskDisplay(task, i) {
  const main = document.getElementById("main-container");
  // main.innerHTML = "";

  const taskDetailsContainer1 = document.getElementById("floating-window");
  taskDetailsContainer1.className = `floating-window`;

  // Handle the task details and update HTML
  const taskDetailsContainer = document.createElement("div");
  taskDetailsContainer.className = `frame-item`;
  taskDetailsContainer.style.top = `${i * 239 + 27}px`;

  // Create elements dynamically
  const frame16 = document.createElement("div");
  frame16.className = "frame16";

  const frame17 = document.createElement("div");
  frame17.className = "frame17";

  const image1 = document.createElement("img");
  image1.className = "frame-icon4";
  image1.src = "img/Frameicon7.png";
  image1.alt = "Location";

  const image2 = document.createElement("img");
  image2.className = "frame-icon5";
  image2.src = "img/Frameicon8.png";
  image2.alt = "PostedDate";

  const image3 = document.createElement("img");
  image3.className = "frame-icon5";
  image3.src = "img/Frameicon9.png";
  image3.alt = "Due Date";

  const remote = document.createElement("div");
  remote.className = "remote";
  remote.textContent = task.location;

  const frame18 = document.createElement("div");
  frame18.className = "frame18";

  const Anytime = document.createElement("div");
  Anytime.className = "anytime";
  Anytime.textContent = task.dueDate;

  const frame19 = document.createElement("div");
  frame19.className = "frame19";

  const open = document.createElement("b");
  open.className = "open";
  open.textContent = "Open";
  open.addEventListener("click", function () {
    taskDetailsContainer1.innerHTML = "";

    const closebtn = document.createElement("div");
    closebtn.className = "close-btn";
    closebtn.textContent = "X";
    closebtn.addEventListener("click", function () {
      closeFloatingWindow();
    });

    const floatingWindow = document.getElementById("floating-window");
    floatingWindow.style.display = "block";

    const id = task._id;
    localStorage.setItem("_id", id);

    const para = document.createElement("div");
    para.className = "para";
    para.textContent = task.description;

    // const div1 = document.createElement("div1");
    // div1.className = "div1";
    // div1.textContent = task.pay;

    const frame22 = document.createElement("div");
    frame22.className = "frame22";

    const image4 = document.createElement("img");
    image4.className = "frame-icon4";
    image4.src = "img/Frameicon7.png";

    const remote = document.createElement("div");
    remote.className = "remote";
    remote.textContent = task.location;

    frame22.appendChild(remote);
    frame22.appendChild(image4);

    const frame23 = document.createElement("div");
    frame23.className = "frame23";

    const anytime = document.createElement("div");
    anytime.className = "anytime";
    anytime.textContent = task.dueDate;

    const image5 = document.createElement("img");
    image5.className = "frame-icon5";
    image5.src = "img/Frameicon8.png";

    frame23.appendChild(anytime);
    frame23.appendChild(image5);

    const frame24 = document.createElement("div");
    frame24.className = "frame24";

    const pay = document.createElement("div");
    pay.className = "Pay";
    pay.textContent = "Pay: $" + task.pay;

    frame24.appendChild(pay);

    const frame25 = document.createElement("div");
    frame25.className = "frame25";

    const image6 = document.createElement("img");
    image6.className = "frame-icon5";
    image6.src = "img/Frameicon9.png";

    const flexible = document.createElement("div");
    flexible.className = "flexible";
    flexible.textContent = task.datePosted;

    frame25.appendChild(flexible);
    frame25.appendChild(image6);

    const frame26 = document.createElement("div");
    frame26.className = "frame26";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = task.title;

    const description = document.createElement("div");
    description.className = "description";
    description.textContent = task.description;

    const chat = document.createElement("button");
    chat.className = "accept";
    chat.textContent = "Chat with the Seeker";

    chat.addEventListener("click", function () {
      window.location.href = "/chat-1";
    });

    const workimage = document.createElement("img");
    workimage.className = "frame212";
    workimage.src = task.imagePath;
    workimage.alt = "Work";

    taskDetailsContainer1.appendChild(frame22);
    taskDetailsContainer1.appendChild(frame23);
    taskDetailsContainer1.appendChild(frame24);
    taskDetailsContainer1.appendChild(frame25);
    taskDetailsContainer1.appendChild(workimage);
    taskDetailsContainer1.appendChild(title);
    taskDetailsContainer1.appendChild(description);
    taskDetailsContainer1.appendChild(para);
    taskDetailsContainer1.appendChild(chat);
    taskDetailsContainer1.appendChild(closebtn);
  });

  const pay = document.createElement("div");
  pay.className = "Pay";
  pay.textContent = "Pay: $" + task.pay;

  const frame20 = document.createElement("div");
  frame20.className = "frame20";

  const flexible = document.createElement("div");
  flexible.className = "flexible";
  flexible.textContent = task.datePosted;

  // Update data
  const sellItemsOn = document.createElement("div");
  sellItemsOn.className = "sell-items-on";
  sellItemsOn.textContent = task.title;

  // const div = document.createElement("div");
  // div.className = "div";
  // div.textContent = task.pay;
  // div.style.fontSize = "15px";

  const workimage = document.createElement("img");
  workimage.className = "frame21";
  workimage.src = task.imagePath;
  workimage.alt = "Work";

  // Append data to the main container
  frame16.appendChild(sellItemsOn);
  // frame16.appendChild(div);
  frame17.appendChild(remote);
  frame17.appendChild(image1);
  frame16.appendChild(frame17);
  frame18.appendChild(Anytime);
  frame18.appendChild(image2);
  frame16.appendChild(frame18);
  frame19.appendChild(open);
  frame19.appendChild(pay);
  frame16.appendChild(frame19);
  frame20.appendChild(flexible);
  frame20.appendChild(image3);
  frame16.appendChild(frame20);

  // Append the entire structure to the main container
  taskDetailsContainer.appendChild(frame16);
  taskDetailsContainer.appendChild(workimage);
  main.appendChild(taskDetailsContainer);
}
