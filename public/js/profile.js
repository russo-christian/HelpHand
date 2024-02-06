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
    const location = document.getElementById("location"); 
    const userDob = document.getElementById("dob");
    const full = document.getElementById("fullname");
    const email = localStorage.getItem("logged-email");
    console.log(email);
    // Fetch user details
    fetch(`/api/users/profile/${email}`)
      .then((response) => response.json())
      .then((user) => {
        // Update the HTML to display the user details
        userDetailsElement.innerHTML = `
          <span class="user-nam" id="username">${user.firstName}</span>
          <!-- Add more fields as needed -->
        `;
        location.innerHTML = `${user.location}, Australia`;
        dob.innerHTML = `${user.dateOfBirth}`;
        fullname.innerHTML= `${user.firstName} ${user.lastName}`;
  
        console.log(user);
      })
      .catch((error) => console.error("Error fetching user details:", error));
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded event fired");
  
    // Get elements
    var editUsernameIcon = document.getElementById("editUsernameIcon");
    var usernameSpan = document.getElementById("username");
    var usernameInput = document.getElementById("usernameInput");
  
    // Log the elements to ensure they are correctly obtained
    console.log("editUsernameIcon:", editUsernameIcon);
    console.log("usernameSpan:", usernameSpan);
    console.log("usernameInput:", usernameInput);
  
    // Set initial visibility
    usernameInput.style.display = "none";
  
    // Log a message to verify that the click event is registered
    console.log("Adding click event to edit icon");
  
    // Add click event to the edit icon for editing username
    editUsernameIcon.addEventListener("click", function() {
        // Log a message to verify that the click event is triggered
        console.log("Edit icon clicked");
  
        // Toggle visibility of static element and input field for username
        usernameSpan.style.display = (usernameSpan.style.display === "none") ? "inline" : "none";
        usernameInput.style.display = (usernameInput.style.display === "none") ? "inline" : "none";
  
        // Set input field value to current username
        usernameInput.value = usernameSpan.innerText;
  
        // Focus on the input field when it becomes visible
        if (usernameInput.style.display !== "none") {
            usernameInput.focus();
        }
    });
  
    // Log a message to verify that the blur event is registered
    console.log("Adding blur event to input field");
  
    // Add blur event to input field for updating username
    usernameInput.addEventListener("blur", function() {
        // Log a message to verify that the blur event is triggered
        console.log("Input field blurred");
  
        updateUsername();
    });
  
    // Log a message to verify that the keydown event is registered
    console.log("Adding keydown event to input field");
  
    // Add keydown event to handle Enter key
    usernameInput.addEventListener("keydown", function(event) {
        // Log a message to verify that the keydown event is triggered
        console.log("Key pressed:", event.key);
  
        if (event.key === "Enter") {
            updateUsername();
        }
    });
  
    function updateUsername() {
        // Log a message to verify that the update function is called
        console.log("Updating username");
        console.log("Updating database with new value:", usernameInput.value.trim());
        // Set the text content of the usernameSpan directly
        usernameSpan.innerText = usernameInput.value.trim();
    
        // Hide the input field and display the static element
        usernameInput.style.display = "none";
        usernameSpan.style.display = "inline";    
    }
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded event fired");
  
    // Get elements
    var editLocIcon = document.getElementById("editLocIcon");
    var locationSpan = document.getElementById("location");
    var locationInput = document.getElementById("locationInput");
  
    // Log the elements to ensure they are correctly obtained
    console.log("editLocIcon:", editUsernameIcon);
    console.log("locSpan:", locationSpan);
    console.log("locInput:", locationInput);
  
    // Set initial visibility
    locationInput.style.display = "none";
  
    // Log a message to verify that the click event is registered
    console.log("Adding click event to edit icon");
  
    // Add click event to the edit icon for editing username
    editLocIcon.addEventListener("click", function() {
        // Log a message to verify that the click event is triggered
        console.log("Edit icon clicked");
  
        // Toggle visibility of static element and input field for username
        locationSpan.style.display = (locationSpan.style.display === "none") ? "inline" : "none";
        locationInput.style.display = (locationInput.style.display === "none") ? "inline" : "none";
  
        // Set input field value to current username
        locationInput.value = locationSpan.innerText;
  
        // Focus on the input field when it becomes visible
        if (locationInput.style.display !== "none") {
            locationInput.focus();
        }
    });
  
    // Log a message to verify that the blur event is registered
    console.log("Adding blur event to input field");
  
    // Add blur event to input field for updating username
    locationInput.addEventListener("blur", function() {
        // Log a message to verify that the blur event is triggered
        console.log("Input field blurred");
  
        updateLocation();
    });
  
    // Log a message to verify that the keydown event is registered
    console.log("Adding keydown event to input field");
  
    // Add keydown event to handle Enter key
    locationInput.addEventListener("keydown", function(event) {
        // Log a message to verify that the keydown event is triggered
        console.log("Key pressed:", event.key);
  
        if (event.key === "Enter") {
            updateLocation();
        }
    });
  
    function updateLocation() {
        // Log a message to verify that the update function is called
        console.log("Updating location");
        console.log("Updating database with new value:", locationInput.value.trim());
        // Set the text content of the usernameSpan directly
        locationSpan.innerText = locationInput.value.trim();
    
        // Hide the input field and display the static element
        locationInput.style.display = "none";
        locationSpan.style.display = "inline";    
    }
  });
  
  // edit icons for dob and name
  
  document.addEventListener('DOMContentLoaded', function () {
    // Function to handle the edit functionality
    function handleEdit(container, top, left) {
      // Create an input element
      const inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.value = container.innerText.trim(); // Trim any leading or trailing spaces
  
      // Apply styling to the input element
      inputElement.style.display = 'block';
      inputElement.style.position = 'absolute';
      inputElement.style.height = '20px';
      inputElement.style.width = '200px';
      inputElement.style.top = `${top}px`; // Set the top position based on the parameter
      inputElement.style.left = `${left}px`; // Set the left position based on the parameter
      inputElement.style.margin = '0';
      inputElement.style.padding = '0';
      inputElement.style.border = 'none';
      inputElement.style.background = 'none';
      inputElement.style.fontSize = '16px';
      inputElement.style.color = '#716b6b';
      inputElement.style.zIndex = '99'; // Adjust the value based on your needs
  
      // Replace the content element with the input element
      container.replaceWith(inputElement);
  
      // Focus on the input element
      inputElement.focus();
  
      // Add a blur event listener to save the changes when the input loses focus
      // Add a keydown event listener to save the changes when the "Enter" key is pressed
      inputElement.addEventListener('blur', saveChanges);
      inputElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          saveChanges();
        }
      });
  
      function saveChanges() {
        const updatedValue = inputElement.value;
  
        // Replace the input element with the updated content
        container.innerText = updatedValue;
  
        // Send an HTTP request to update the appropriate field in the database
        // For demonstration, let's assume a different endpoint for updating the full name
        fetch('/update-fullname', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullName: updatedValue
          })
        })
          .then(response => {
            if (response.ok) {
              console.log('Full Name updated successfully.');
            } else {
              console.error('Failed to update Full Name.');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
  
        // Replace the input element with the original content
        inputElement.replaceWith(container);
      }
    }
  
    // Get the elements for the original edit icon for Date of Birth
    const editIconDOB = document.querySelector('.edit-246-1-icon1');
    const dobContainer = document.getElementById('dob');
  
    // Get the elements for the new edit icon for Full Name
    const editIconFullName = document.querySelector('.edit-246-1-icon2');
    const fullNameContainer = document.getElementById('fullname');
  
    // Apply edit functionality to the Date of Birth on click of the original edit icon
    editIconDOB.addEventListener('click', function () {
      handleEdit(dobContainer, 75, 40);
    });
  
    // Apply edit functionality to the Full Name on click of the new edit icon
    editIconFullName.addEventListener('click', function () {
      handleEdit(fullNameContainer, 150, 40);
    });
  });
  
  
  
  // to add the image in portfolio
  
  document.addEventListener('DOMContentLoaded', function () {
    // Get the upload image icon and input elements
    const uploadImageIcon = document.getElementById('uploadImageIcon');
    const uploadImageInput = document.getElementById('uploadImageInput');
  
    // Function to handle image upload
    function handleImageUpload(event) {
        const file = event.target.files[0]; // Get the uploaded file
        if (file) {
            // Process the uploaded file (e.g., upload to server)
            console.log('Uploading file:', file.name);
            
            // You can now send an HTTP request to your server to handle the file upload
            // Example:
            // const formData = new FormData();
            // formData.append('file', file);
            // fetch('/upload-image', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => {
            //     if (response.ok) {
            //         console.log('Image uploaded successfully.');
            //     } else {
            //         console.error('Failed to upload image.');
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
        }
    }
  
    // Add event listener to the upload image icon
    uploadImageIcon.addEventListener('click', function () {
        // Trigger the file input when the icon is clicked
        uploadImageInput.click();
    });
  
    // Add event listener to the file input for image upload
    uploadImageInput.addEventListener('change', handleImageUpload);
  });
  
  
  
  
  
  
  
  