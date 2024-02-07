document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", function () {
    logout();
  });

  function logout() {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    alert("Logout successful!");
    // Redirect to the homepage
    window.location.href = "/";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Assuming there's an HTML element with id "userDetails" to display the user details
  const userDetailsElement = document.getElementById("username");
  const email = localStorage.getItem("logged-email");
  console.log(email);

  // Fetch user details
  fetch(`/api/users/profile/${email}`)
    .then((response) => response.json())
    .then((user) => {
      // Assuming 'user' contains the user details
      // Update the HTML to display the user details
      userDetailsElement.innerHTML = `
        <span class="user-nam" id="username">${user.firstName}</span>
        <!-- Add more fields as needed -->
      `;
      console.log(user);
    })
    .catch((error) => console.error("Error fetching user details:", error));

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
