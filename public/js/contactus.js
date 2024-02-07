document.addEventListener("DOMContentLoaded", function () {
  const contactUsButton = document.getElementById("submit");

  contactUsButton.addEventListener("click", function () {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lsname").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("msg").value;
    const data = { fname, lsname, email, message };
    submitForm(data, "/api/contactus");
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
        alert("Message sent successfully!");
        window.location.href = "/";
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
});