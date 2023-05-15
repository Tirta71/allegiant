const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const table = document.querySelector("table");

let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskValue = taskInput.value;
  const dateValue = dateInput.value;

  if (taskValue !== "" && dateValue !== "") {
    const row = document.createElement("tr");
    const taskCell = document.createElement("td");
    const dateCell = document.createElement("td");
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    taskCell.textContent = taskValue;
    dateCell.textContent = dateValue;
    deleteButton.textContent = "Hapus";
    editButton.textContent = "Ubah";

    deleteButton.classList.add("remove-button");
    editButton.classList.add("edit-button");

    deleteButton.addEventListener("click", function () {
      deleteTask(row);
    });

    editButton.addEventListener("click", function () {
      const newTaskValue = prompt("Masukkan tugas baru:", taskCell.textContent);
      const newDateValue = prompt(
        "Masukkan deadline baru:",
        dateCell.textContent
      );
      if (newTaskValue !== null && newDateValue !== null) {
        taskCell.textContent = newTaskValue;
        dateCell.textContent = newDateValue;
        updateTaskInLocalStorage(row, newTaskValue, newDateValue);
      }
    });

    deleteCell.appendChild(deleteButton);
    deleteCell.appendChild(editButton);
    row.appendChild(taskCell);
    row.appendChild(dateCell);
    row.appendChild(deleteCell);

    table.appendChild(row);

    taskInput.value = "";
    dateInput.value = "";

    storedTasks.push({ task: taskValue, date: dateValue });
    saveTasksToLocalStorage(storedTasks);

    row.setAttribute("data-index", storedTasks.length - 1);
  }
});

function loadTasksFromLocalStorage() {
  if (storedTasks.length > 0) {
    for (let i = 0; i < storedTasks.length; i++) {
      const task = storedTasks[i];
      const row = createTaskRow(task.task, task.date, i);
      table.appendChild(row);
    }
  }
}

function createTaskRow(taskValue, dateValue, index) {
  const row = document.createElement("tr");
  const taskCell = document.createElement("td");
  const dateCell = document.createElement("td");
  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  taskCell.textContent = taskValue;
  dateCell.textContent = dateValue;
  deleteButton.textContent = "Hapus";
  editButton.textContent = "Ubah";

  deleteButton.classList.add("remove-button");
  editButton.classList.add("edit-button");

  deleteButton.addEventListener("click", function () {
    deleteTask(row);
  });

  editButton.addEventListener("click", function () {
    const newTaskValue = prompt("Masukkan tugas baru:", taskValue);
    const newDateValue = prompt("Masukkan deadline baru:", dateValue);
    if (newTaskValue !== null && newDateValue !== null) {
      taskCell.textContent = newTaskValue;
      dateCell.textContent = newDateValue;
      updateTaskInLocalStorage(row, newTaskValue, newDateValue);
    }
  });

  deleteCell.appendChild(deleteButton);
  deleteCell.appendChild(editButton);
  row.appendChild(taskCell);
  row.appendChild(dateCell);
  row.appendChild(deleteCell);

  row.setAttribute("data-index", index);

  return row;
}

function loadTasksFromLocalStorage() {
  if (storedTasks.length > 0) {
    for (let i = 0; i < storedTasks.length; i++) {
      const task = storedTasks[i];
      const row = createTaskRow(task.task, task.date, i);
      table.appendChild(row);
    }
  }
}

function updateTaskInLocalStorage(row, taskValue, dateValue) {
  const rowIndex = parseInt(row.getAttribute("data-index"));

  if (rowIndex !== -1 && rowIndex < storedTasks.length) {
    storedTasks[rowIndex].task = taskValue;
    storedTasks[rowIndex].date = dateValue;
    saveTasksToLocalStorage(storedTasks);
  }
}

function deleteTask(row) {
  const rowIndex = parseInt(row.getAttribute("data-index"));

  if (rowIndex !== -1 && rowIndex < storedTasks.length) {
    row.remove();
    storedTasks.splice(rowIndex, 1);
    saveTasksToLocalStorage(storedTasks);
    updateRowIndices();
  }
}

function updateRowIndices() {
  const rows = table.querySelectorAll("tr");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    row.setAttribute("data-index", i);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadTasksFromLocalStorage();
});
