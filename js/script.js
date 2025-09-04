// Ambil elemen DOM
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todoTableBody = document.querySelector("#todo-table tbody");
const deleteButton = document.getElementById("delete-button");
const filterButton = document.getElementById("filter-button");

// Array untuk menyimpan task
let todos = [];

// Filter saat ini
let currentFilter = "all";

function renderTodos(filter = "all") {
  todoTableBody.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return todo.status === filter;
  });

  if (filteredTodos.length === 0) {
    todoTableBody.innerHTML = `
      <tr>
        <td colspan="4">Tidak ada tugas</td>
      </tr>
    `;
    return;
  }

  filteredTodos.forEach((todo, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.dueDate}</td>
      <td>
        <select data-index="${index}" class="status-select">
          <option value="Belum Selesai" ${
            todo.status === "Belum Selesai" ? "selected" : ""
          }>Belum Selesai</option>
          <option value="Sedang Dikerjakan" ${
            todo.status === "Sedang Dikerjakan" ? "selected" : ""
          }>Sedang Dikerjakan</option>
          <option value="Tertunda" ${
            todo.status === "Tertunda" ? "selected" : ""
          }>Tertunda</option>
          <option value="Selesai" ${
            todo.status === "Selesai" ? "selected" : ""
          }>Selesai</option>
        </select>
      </td>
      <td>
        <button data-index="${index}" class="delete-task">Hapus</button>
      </td>
    `;
    todoTableBody.appendChild(tr);
  });
}

// Event listener untuk select status
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("status-select")) {
    const idx = e.target.dataset.index;
    todos[idx].status = e.target.value;
  }
});

// Event listener untuk delete per task
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    const idx = e.target.dataset.index;
    todos.splice(idx, 1);
    renderTodos(currentFilter);
  }
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  todos.push({
    task: todoInput.value,
    dueDate: todoDate.value,
    status: "Belum Selesai",
  });
  todoInput.value = "";
  todoDate.value = "";
  renderTodos(currentFilter);
});

// fitur hapus semua
deleteButton.addEventListener("click", () => {
  todos = [];
  renderTodos(currentFilter);
});

//  fitur filter task berdasarkan status
filterButton.addEventListener("click", () => {
  if (currentFilter === "all") {
    currentFilter = "Selesai";
    filterButton.textContent = "TAMPILKAN SELESAI";
  } else if (currentFilter === "Selesai") {
    currentFilter = "Belum Selesai";
    filterButton.textContent = "TAMPILKAN BELUM SELESAI";
  } else {
    currentFilter = "all";
    filterButton.textContent = "TAMPILKAN SEMUA";
  }
  renderTodos(currentFilter);
});

// Render awal
renderTodos();
