let captcha;
let fname, pass, lname, email;

document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("register-button");

  registerButton.addEventListener("click", function () {
    fname = document.getElementById("register-first-name").value;

    lname = document.getElementById("register-last-name").value;

    email = document.getElementById("register-email").value;

    pass = document.getElementById("register-password").value;

    if (fname == "" || lname == "" || email == "" || pass == "") {
      alert("Please fill in all the fields");
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("email", email);
    localStorage.setItem("pass", pass);
    window.location.href = "/complete-registration";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const registerButton1 = document.getElementById("register-button1");
  const myCheckbox = document.getElementById("checkbox");

  function getCheckboxValue() {
    const isChecked = myCheckbox.checked;
    console.log("Switch value:", isChecked);
  }

  getCheckboxValue();
  myCheckbox.addEventListener("change", getCheckboxValue);

  registerButton1.addEventListener("click", function () {
    const firstName = localStorage.getItem("fname");
    const lastName = localStorage.getItem("lname");
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("pass");
    const username = document.getElementById("user-name").value;
    const location = document.getElementById("location").value;
    const dateOfBirth = document.getElementById("dob").value;
    const seeker = myCheckbox.checked;

    if (username == "" || location == "" || dateOfBirth == "") {
      alert("Please fill in all the fields");
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
      username,
      location,
      dateOfBirth,
      seeker,
    };
    submitForm(data, "/api/users/create");
    console.log(data);
  });

  async function submitForm(data, url) {
    try {
      if (document.getElementById("captcha").value == captcha.innerHTML) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
          localStorage.clear();
          alert("Registration successful! Redirecting to homepage.");
          window.location.href = "/"; // Redirect to the homepage
        } else {
          alert("Error: " + result.message);
        }
      } else {
        alert("Captcha is wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
});

function generate() {
  captcha = document.getElementById("image");
  let uniquechar = "";

  const randomchar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Generate captcha for length of
  // 5 with random character
  for (let i = 1; i < 5; i++) {
    uniquechar += randomchar.charAt(Math.random() * randomchar.length);
  }

  // Store generated input
  captcha.innerHTML = uniquechar;
}
