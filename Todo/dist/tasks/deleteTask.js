import { saveToLocalStorage, getFromLocalStorage, } from "../utils/localStorageUtils.js";
export function deleteTask(taskId) {
    const tasks = getFromLocalStorage("tasks") || [];
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        return "Tâche introuvable.";
    }
    if (tasks[taskIndex].status === "validée") {
        return "Les tâches validées ne peuvent pas être supprimées.";
    }
    tasks.splice(taskIndex, 1);
    saveToLocalStorage("tasks", tasks);
    return "Tâche supprimée avec succès !";
}
