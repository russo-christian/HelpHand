document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("register-button");

  registerButton.addEventListener("click", function () {
    const firstName = document.getElementById("register-first-name").value;
    const lastName = document.getElementById("register-last-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    const data = { firstName, lastName, email, password };
    submitForm(data, "/api/users/create");
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
        alert("Registration successful! Redirecting to homepage.");
        window.location.href = "/"; // Redirect to the homepage
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
