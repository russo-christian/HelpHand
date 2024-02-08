document.addEventListener("DOMContentLoaded", function () {
  // Currency formatting handlers
  document.querySelectorAll("input[data-type='currency']").forEach((input) => {
    input.addEventListener("keyup", () => formatCurrency(input));
    input.addEventListener("blur", () => formatCurrency(input, "blur"));
  });

  function formatNumber(n) {
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatCurrency(input, blur = false) {
    let input_val = input.value;
    if (input_val === "") {
      return;
    }

    let original_len = input_val.length;
    let caret_pos = input.selectionStart;

    if (input_val.indexOf(".") >= 0) {
      let decimal_pos = input_val.indexOf(".");
      let left_side = input_val.substring(0, decimal_pos);
      let right_side = input_val.substring(decimal_pos);

      left_side = formatNumber(left_side);
      right_side = formatNumber(right_side);
      if (blur) {
        right_side += "00";
      }

      right_side = right_side.substring(0, 2);
      input_val = "$" + left_side + "." + right_side;
    } else {
      input_val = formatNumber(input_val);
      input_val = "$" + input_val;
      if (blur) {
        input_val += ".00";
      }
    }

    input.value = input_val.substring(0, 8);

    let updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input.setSelectionRange(caret_pos, caret_pos);
  }

  // Image preview functionality
  document.querySelectorAll("input[type='file']").forEach((input) => {
    input.addEventListener("change", function () {
      previewImage(input);
    });
  });

  function previewImage(input) {
    let file = input.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function (e) {
        let preview = document.createElement("img");
        preview.src = e.target.result;
        preview.style.maxWidth = "200px";
        document.body.appendChild(preview);
      };
      reader.readAsDataURL(file);
    }
  }
  // Post task functionality using Fetch API
  document.querySelector(".post-task").addEventListener("click", function () {
    let taskData = {
      datePosted: new Date(),
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      dueDate: new Date(document.getElementById("date").value),
      pay: parseFloat(
        document.getElementById("currencyfield").value.replace("$", "")
      ), // Convert string to number
      location: document.getElementById("loc").value,
      category: document.getElementById("category").value,
    };

    console.log("Sending task data to server:", taskData);

    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task posted successfully:", data);
        window.location.href = "/my-tasks"; // Redirect on success
      })
      .catch((error) => {
        console.error("Error posting task:", error);
      });
  });
});
