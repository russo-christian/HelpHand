document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login-button");

  loginButton.addEventListener("click", function () {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const data = { email, password };
    submitForm(data, "/api/users/login");
  });

  async function submitForm(data, url) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Login successful! Redirecting to homepage.");
        console.log(localStorage.setItem("token", data));
        // window.location.href = "/"; // Redirect to the homepage
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
