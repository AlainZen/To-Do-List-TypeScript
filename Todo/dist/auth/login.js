import { getFromLocalStorage } from "../utils/localStorageUtils.js";
export function login(email, password) {
    const users = getFromLocalStorage("users") || [];
    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
        return "Email ou mot de passe incorrect.";
    }
    // stocke le user connecté en localstorage
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
}
