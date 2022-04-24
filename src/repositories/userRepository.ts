import connection from "../database.js";

export interface User {
  id: number;
  email: string;
  password: string;
}

export type UserCreateData = Omit<User, "id">;

export async function create(user: UserCreateData) {
  await connection.users.create({ data: user });
}
export async function findByEmail(email: string) {
  const user = (await connection.users.findFirst({ where: { email } })) as User;
  return user;
}
