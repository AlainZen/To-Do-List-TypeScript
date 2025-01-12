import { register } from "./auth/register.js";
import { login } from "./auth/login.js";
import { createTask } from "./tasks/createTask.js";
import { listTasks } from "./tasks/listTasks.js";
import { validateTask } from "./tasks/validateTask.js";
import { deleteTask } from "./tasks/deleteTask.js";
const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const tasksContainer = document.getElementById("tasks-container");
const registerContainer = document.getElementById("register-container");
const loginContainer = document.getElementById("login-container");

// gestion de l'inscri
registerBtn.addEventListener("click", () => {
    const emailField = document.getElementById("register-email");
    const passwordField = document.getElementById("register-password");
    const email = emailField.value;
    const password = passwordField.value;
    const message = register(email, password);
    alert(message);
    if (message === "Inscription réussie" || message === "Inscription réussie !") {
        emailField.value = "";
        passwordField.value = "";
    }
});

// gestion de la co
loginBtn.addEventListener("click", () => {
    const email = document.getElementById("login-email")
        .value;
    const password = document.getElementById("login-password").value;
    const user = login(email, password);
    if (typeof user === "string") {
        alert(user);
    }
    else {
        alert("Connexion réussie !");
        registerContainer.style.display = "none";
        loginContainer.style.display = "none";
        tasksContainer.style.display = "block";
        refreshTaskList();
    }
});
// ajouter une tache
addTaskBtn.addEventListener("click", () => {
    const title = document.getElementById("task-title")
        .value;
    const description = document.getElementById("task-description").value;
    const deadline = document.getElementById("task-deadline").value;
    const message = createTask(title, description, deadline);
    alert(message);
    refreshTaskList();
});
// rafraichir la liste des taches
function refreshTaskList() {
    taskList.innerHTML = ""; 
    const tasks = listTasks(); 
    tasks.forEach((task) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
      <div class="task-content">
        <div class="task-header">
          <strong>${task.title}</strong> - <em>${task.status}</em>
        </div>
        <p class="task-description">${task.description}</p>
        <p class="task-deadline">${task.deadline}</p>
        <div class="task-actions">
          ${task.status === "à faire"
            ? `<button data-id="${task.id}" class="validate-btn">Valider</button>`
            : ""}
          ${task.status === "à faire"
            ? `<button data-id="${task.id}" class="delete-btn">Supprimer</button>`
            : ""}
        </div>
      </div>
    `;
        taskList.appendChild(taskItem); 
    });
     // boutons de validation
    document.querySelectorAll(".validate-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const taskId = btn.dataset.id;
            alert(validateTask(taskId));
            refreshTaskList();
        });
    });
    // bouton delete
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const taskId = btn.dataset.id;
            alert(deleteTask(taskId));
            refreshTaskList();
        });
    });
}
