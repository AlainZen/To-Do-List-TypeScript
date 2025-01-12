import { User } from "../utils/types";
import { getFromLocalStorage } from "../utils/localStorageUtils";


export function login(email: string, password: string): string | User {
  const users = getFromLocalStorage<User[]>("users") || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return "Email ou mot de passe incorrect.";
  }
  
  localStorage.setItem("currentUser", JSON.stringify(user));

  return user;
}
