$("input[data-type='currency']").on({
  keyup: function () {
    formatCurrency($(this));
  },
  blur: function () {
    formatCurrency($(this), "blur");
  },
});

function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.

  // get input value
  var input_val = input.val();

  // don't validate empty input
  if (input_val === "") {
    return;
  }

  // original length
  var original_len = input_val.length;

  // initial caret position
  var caret_pos = input.prop("selectionStart");

  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;

    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }

  // Limit input value length to 8 digits
  input_val = input_val.substring(0, 8);

  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

function previewImage(input) {
  var preview = document.getElementById("upload-preview");
  var file = input.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    preview.src = e.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

document
  .getElementById("upload-container")
  .addEventListener("click", function () {
    document.getElementById("file-input").click();
  });

document
  .getElementById("upload-container1")
  .addEventListener("click", function () {
    document.getElementById("file-input1").click();
  });

document
  .getElementById("upload-container2")
  .addEventListener("click", function () {
    document.getElementById("file-input2").click();
  });

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
        window.location.href = "/browse-task";
      });
    } else if (user.seeker === false) {
      browse.addEventListener("click", function () {
        window.location.href = "/browse-task1";
      });
    }
  })
  .catch((error) => console.error("Error fetching user details:", error));
