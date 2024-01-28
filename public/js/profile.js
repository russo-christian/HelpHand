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
});
