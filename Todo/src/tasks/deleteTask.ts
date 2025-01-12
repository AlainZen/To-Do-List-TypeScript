import { Task } from "../utils/types";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageUtils";

export function deleteTask(taskId: string): string {
  const tasks = getFromLocalStorage<Task[]>("tasks") || [];
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
