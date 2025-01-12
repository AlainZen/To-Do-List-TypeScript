import { Task } from "../utils/types";
import { getFromLocalStorage } from "../utils/localStorageUtils";

export function listTasks(): Task[] {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const tasks = getFromLocalStorage<Task[]>("tasks") || [];

  return tasks.filter((task) => task.userId === currentUser.id);
}
