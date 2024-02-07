document.addEventListener("DOMContentLoaded", function () {
  fetchTasksAndDisplay();
});

function fetchTasksAndDisplay() {
  fetch("/api/tasks")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return response.json();
    })
    .then((tasks) => {
      const mainContainer = document.getElementById("main-container");
      tasks.forEach((task) => displayTask(task, mainContainer));
    })
    .catch((error) => console.error("Error fetching tasks:", error));
}

function displayTask(task, mainContainer) {
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";
  const formattedPay = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(task.pay);
  taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>Description: ${task.description}</p>
        <p>Pay: ${formattedPay}</p>
        <p>Location: ${task.location}</p>
        <p>Due Date: ${new Date(task.dueDate).toLocaleDateString()}</p>
        <button class="view-task-details" onclick="showTaskDetails('${
          task._id
        }')">View Details</button>
    `;
  mainContainer.appendChild(taskItem);
}

function showTaskDetails(taskId) {
  fetch(`/api/tasks/${taskId}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch task details");
      return response.json();
    })
    .then((task) => {
      displayTaskDetailsInFloatingWindow(task);
    })
    .catch((error) => console.error("Error fetching task details:", error));
}

function displayTaskDetailsInFloatingWindow(task) {
  const floatingWindow = document.getElementById("floating-window");
  const formattedPay = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(task.pay);
  floatingWindow.innerHTML = `
        <h2>${task.title}</h2>
        <p>Description: ${task.description}</p>
        <p>Pay: ${formattedPay}</p>
        <p>Location: ${task.location}</p>
        <p>Due Date: ${new Date(task.dueDate).toLocaleDateString()}</p>
        <div class="close-btn" onclick="closeFloatingWindow()">Close</div>
    `;
  floatingWindow.style.display = "block";
}

function closeFloatingWindow() {
  const floatingWindow = document.getElementById("floating-window");
  floatingWindow.style.display = "none";
}
