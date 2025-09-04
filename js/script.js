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
