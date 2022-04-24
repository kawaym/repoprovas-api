import * as userRepository from "../repositories/userRepository.js";

import bcrypt from "bcrypt";

export async function create(user: userRepository.UserCreateData) {
  const { email, password } = user;
  const hashedPass = hash(password);
  try {
    const validation = await userRepository.findByEmail(email);
    if (validation) {
      throw "conflict";
    }

    await userRepository.create({ email, password: hashedPass });
  } catch (e) {
    throw "internal_server_error";
  }
}

function hash(item: string) {
  const hashed = bcrypt.hashSync(item, 10);
  return hashed;
}
