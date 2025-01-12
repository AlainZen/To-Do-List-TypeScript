import { User } from "../utils/types";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageUtils";

export function register(email: string, password: string): string {
  const users = getFromLocalStorage<User[]>("users") || [];
  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    return "Utilisateur déjà existant.";
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
  };

  users.push(newUser);
  saveToLocalStorage("users", users);

  return "Inscription réussie";
}
