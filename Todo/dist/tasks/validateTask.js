import { saveToLocalStorage, getFromLocalStorage, } from "../utils/localStorageUtils.js";
export function validateTask(taskId) {
    const tasks = getFromLocalStorage("tasks") || [];
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        return "Tâche introuvable.";
    }
    tasks[taskIndex].status = "validée";
    saveToLocalStorage("tasks", tasks);
    return "Tâche validée avec succès !";
}
