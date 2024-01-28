let email_;
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login-button");

  loginButton.addEventListener("click", function () {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    email_ = email;
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
        localStorage.setItem("logged-email", email_);
        localStorage.setItem("token", "1");
        window.location.href = "/";
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    console.log(storedToken);
    alert(`User already logged in!`);
    window.location.href = "/profile";
  }
});

