import { register } from "./auth/register";
import { login } from "./auth/login";
import { createTask } from "./tasks/createTask";
import { listTasks } from "./tasks/listTasks";
import { validateTask } from "./tasks/validateTask";
import { deleteTask } from "./tasks/deleteTask";

const registerBtn = document.getElementById("register-btn")!;
const loginBtn = document.getElementById("login-btn")!;
const addTaskBtn = document.getElementById("add-task-btn")!;
const taskList = document.getElementById("task-list")!;
const tasksContainer = document.getElementById("tasks-container")!;
const registerContainer = document.getElementById("register-container")!;
const loginContainer = document.getElementById("login-container")!;

// gestion du signin
registerBtn.addEventListener("click", () => {
  const emailField = document.getElementById("register-email") as HTMLInputElement;
  const passwordField = document.getElementById("register-password") as HTMLInputElement;
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
  const email = (document.getElementById("login-email") as HTMLInputElement)
    .value;
  const password = (
    document.getElementById("login-password") as HTMLInputElement
  ).value;

  const user = login(email, password);
  if (typeof user === "string") {
    alert(user);
  } else {
    alert("Connexion réussie !");
    registerContainer.style.display = "none";
    loginContainer.style.display = "none";
    tasksContainer.style.display = "block";
    refreshTaskList();
  }
});

// ajouter une tache
addTaskBtn.addEventListener("click", () => {
  const title = (document.getElementById("task-title") as HTMLInputElement)
    .value;
  const description = (
    document.getElementById("task-description") as HTMLInputElement
  ).value;
  const deadline = (
    document.getElementById("task-deadline") as HTMLInputElement
  ).value;

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
          ${
            task.status === "à faire"
              ? `<button data-id="${task.id}" class="validate-btn">Valider</button>`
              : ""
          }
          ${
            task.status === "à faire"
              ? `<button data-id="${task.id}" class="delete-btn">Supprimer</button>`
              : ""
          }
        </div>
      </div>
    `;
    
    taskList.appendChild(taskItem); // ajouter la tache a la liste

  });

  // boutons de validation
  document.querySelectorAll(".validate-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const taskId = (btn as HTMLButtonElement).dataset.id!;
      alert(validateTask(taskId));
      refreshTaskList();
    });
  });

  // bouton delete
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const taskId = (btn as HTMLButtonElement).dataset.id!;
      alert(deleteTask(taskId));
      refreshTaskList();
    });
  });
}

