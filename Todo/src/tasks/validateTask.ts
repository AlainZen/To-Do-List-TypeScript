import { Task } from "../utils/types";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageUtils";

export function validateTask(taskId: string): string {
  const tasks = getFromLocalStorage<Task[]>("tasks") || [];
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return "Tâche introuvable.";
  }

  tasks[taskIndex].status = "validée";
  saveToLocalStorage("tasks", tasks);

  return "Tâche validée avec succès !";
}
