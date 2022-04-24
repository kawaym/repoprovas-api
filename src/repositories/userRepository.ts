import connection from "../database.js";

export interface User {
  id: number;
  email: string;
  password: string;
}

export type UserAuthData = Omit<User, "id">;

export async function create(user: UserAuthData) {
  await connection.users.create({ data: user });
}
export async function findByEmail(email: string) {
  const user = (await connection.users.findFirst({ where: { email } })) as User;
  return user;
}
export async function login(user: User, token: string) {
  await connection.sessions.create({ data: { userId: user.id, token } });
}
export async function validateSession(token: string) {
  const session = await connection.sessions.findFirst({ where: { token } });
  return session;
}
