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
  const loginButton = document.getElementById("login-button");
  const profileIcon = document.getElementById("profile-icon");
  const div = document.getElementById("div");

  // Check if there is a token in localStorage on page load
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    // User is logged in, show the profile icon and hide the login button
    if (profileIcon) profileIcon.style.display = "block";
    if (loginButton) loginButton.style.display = "none";
    if (div) div.style.display = "none";
  } else {
    // User is not logged in, show the login button and hide the profile icon
    if (profileIcon) profileIcon.style.display = "none";
    if (div) div.style.display = "block";
    if (loginButton) loginButton.style.display = "block";
  }

  const email = localStorage.getItem("logged-email");
  console.log(email);

  // Fetch user details
  fetch(`/api/users/profile/${email}`)
    .then((response) => response.json())
    .then((user) => {
      console.log(user);
      const browse = document.getElementById("browse");
      if (user.seeker === true) {
        browse.addEventListener("click", function () {
          window.location.href = "/browse-tasks";
        });
      } else if (user.seeker === false) {
        browse.addEventListener("click", function () {
          window.location.href = "/browse-task1";
        });
      }
    })
    .catch((error) => console.error("Error fetching user details:", error));
});
