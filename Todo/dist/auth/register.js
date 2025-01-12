import { saveToLocalStorage, getFromLocalStorage, } from "../utils/localStorageUtils.js";
export function register(email, password) {
    const users = getFromLocalStorage("users") || [];
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
        return "Utilisateur déjà existant.";
    }
    const newUser = {
        id: Date.now().toString(),
        email,
        password, // j'ai pas fait de hash du mot de passe, mais faisable facilement avec bcrypt 
    };
    users.push(newUser);
    saveToLocalStorage("users", users);
    return "Inscription réussie";
}
