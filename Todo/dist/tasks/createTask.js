import { saveToLocalStorage, getFromLocalStorage, } from "../utils/localStorageUtils.js";
export function createTask(title, description, deadline) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (!currentUser.id) {
        return "Vous devez être connecté pour créer une tâche.";
    }
    const tasks = getFromLocalStorage("tasks") || [];
    const newTask = {
        id: Date.now().toString(),
        userId: currentUser.id,
        title,
        description,
        status: "à faire",
        deadline,
    };
    tasks.push(newTask);
    saveToLocalStorage("tasks", tasks);
    return "Tâche créée avec succès !";
}
