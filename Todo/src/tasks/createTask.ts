import { Task } from "../utils/types";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageUtils";

export function createTask(
  title: string,
  description: string,
  deadline: string
): string {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!currentUser.id) {
    return "Vous devez être connecté pour créer une tâche.";
  }

  const tasks = getFromLocalStorage<Task[]>("tasks") || [];
  const newTask: Task = {
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
