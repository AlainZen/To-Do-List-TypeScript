export type User = {
  id: string;
  email: string;
  password: string;
};

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: "à faire" | "validée";
  deadline: string;
};
