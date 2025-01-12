import { getFromLocalStorage } from "../utils/localStorageUtils.js";
export function listTasks() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const tasks = getFromLocalStorage("tasks") || [];
    return tasks.filter((task) => task.userId === currentUser.id);
}
