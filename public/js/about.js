document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login-button");
  const profileIcon = document.getElementById("profile-icon");
  const howitworks = document.getElementById("how-it-works-inner");

  // Check if there is a token in localStorage on page load
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    // User is logged in, show the profile icon and hide the login button
    if (profileIcon) profileIcon.style.display = "block";
    if (loginButton) loginButton.style.display = "none";
    if (howitworks) howitworks.style.display = "none";
  } else {
    // User is not logged in, show the login button and hide the profile icon
    if (profileIcon) profileIcon.style.display = "none";
    if (howitworks) howitworks.style.display = "block";
    if (loginButton) loginButton.style.display = "block";
  }
});

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
