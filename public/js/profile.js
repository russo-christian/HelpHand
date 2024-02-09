let currentUserId = null;
document.addEventListener("DOMContentLoaded", function () {
  setupLogout();
  fetchUserData();
  setupEditIcons();
});

function setupLogout() {
  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    alert("Logout successful!");
    window.location.href = "/";
  });
}

function fetchUserData() {
  const email = localStorage.getItem("logged-email");

  if (email) {
    const url = `/api/users/profile/${email}?t=${new Date().getTime()}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((user) => {
        currentUserId = user._id;
        document.getElementById("username").innerText = user.username;
        document.getElementById("location").innerText = user.location;
        document.getElementById("dob").innerText = user.dateOfBirth
          ? new Date(user.dateOfBirth).toLocaleDateString()
          : "";
        document.getElementById(
          "fullname"
        ).innerText = `${user.firstName} ${user.lastName}`;
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }
}

function setupEditIcons() {
  // Setup edit functionality for username
  const editUsernameIcon = document.getElementById("editUsernameIcon");
  const usernameInput = document.getElementById("usernameInput");
  const usernameDisplay = document.getElementById("username");
  editUsernameIcon.addEventListener("click", function () {
    usernameInput.style.display = "block";
    usernameInput.value = usernameDisplay.innerText; // Pre-fill input with current username
    usernameDisplay.style.display = "none";
    usernameInput.focus();
  });

  usernameInput.addEventListener("blur", function () {
    if (usernameInput.value !== usernameDisplay.innerText) {
      editField("username", usernameInput.value);
    }
    usernameInput.style.display = "none";
    usernameDisplay.style.display = "block";
  });

  usernameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (usernameInput.value !== usernameDisplay.innerText) {
        editField("username", usernameInput.value);
      }
      usernameInput.style.display = "none";
      usernameDisplay.style.display = "block";
    }
  });

  // Similar setup for location
  const editLocationIcon = document.getElementById("editLocIcon");
  const locationInput = document.getElementById("locationInput");
  const locationDisplay = document.getElementById("location");
  editLocationIcon.addEventListener("click", function () {
    locationInput.style.display = "block";
    locationInput.value = locationDisplay.innerText; // Pre-fill input with current location
    locationDisplay.style.display = "none";
    locationInput.focus();
  });

  locationInput.addEventListener("blur", function () {
    if (locationInput.value !== locationDisplay.innerText) {
      editField("location", locationInput.value);
    }
    locationInput.style.display = "none";
    locationDisplay.style.display = "block";
  });

  locationInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (locationInput.value !== locationDisplay.innerText) {
        editField("location", locationInput.value);
      }
      locationInput.style.display = "none";
      locationDisplay.style.display = "block";
    }
  });
  const dobElement = document.getElementById("dob");
  dobElement.onclick = () => {
    const newDob = prompt(
      "Enter new Date of Birth (YYYY-MM-DD):",
      dobElement.innerText
    );
    if (newDob) editField("dateOfBirth", new Date(newDob).toISOString());
  };

  const fullnameElement = document.getElementById("fullname");
  fullnameElement.onclick = () => {
    const newFullName = prompt(
      "Enter new Full Name (First Last):",
      fullnameElement.innerText
    );
    if (newFullName) {
      const [firstName, ...lastName] = newFullName.split(" ");
      editField("firstName", firstName);
      editField("lastName", lastName.join(" "));
    }
  };
}

function editField(fieldName, value) {
  if (!currentUserId || !value) {
    console.error("Invalid data for update.");
    return;
  }

  let updateData = {};
  updateData[fieldName] = value;

  fetch(`/api/users/${currentUserId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to update user data.");
      return response.json();
    })
    .then((updatedUser) => {
      console.log(`${fieldName} updated successfully.`);
      fetchUserData(); // Refresh displayed user data
    })
    .catch((error) => console.error("Error updating user data:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("logged-email");
  const tasks = document.getElementById("myTasksText");

  fetch(`/api/users/profile/${email}`)
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
      if (user.seeker === true) {
        console.log("Seeker");
        tasks.innerText = `Post Tasks`;
      } else if (user.seeker === false) {
        console.log("Helper");
        tasks.innerText = `My Task`;
      }
    });

  document.getElementById("myTasksText").addEventListener("click", function () {
    console.log(tasks.innerText);
    if (tasks.innerText === `POST TASKS`) {
      window.location.href = "/task";
    } else if (tasks.innerText === `MY TASK`) {
      window.location.href = "/my-tasks";
    }
  });

  // Fetch user details
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
});
