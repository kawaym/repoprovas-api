import * as userRepository from "../repositories/userRepository.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../schemas/user.js";

export async function create(user: userRepository.UserAuthData) {
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
export async function login(user: userRepository.UserAuthData) {
  const { email, password } = user;
  try {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw "not_found";
    }
    const comparison = compare(password, user.password);
    if (!comparison) {
      throw "unauthorized";
    }
    const token = createToken(user);
    await userRepository.login(user, token);
    return token;
  } catch (e) {
    throw "internal_server_error";
  }
}
export async function validateSession(token: string) {
  const pass = process.env.PASS_SECRET;

  try {
    const dados = jwt.verify(token, pass);
    const session = await userRepository.validateSession(token);
    if (!session) {
      throw "unauthorized";
    }
    // const user = await userRepository.findByEmail(dados)
  } catch (e) {
    throw "unauthorized";
  }
}

function hash(item: string) {
  const hashed = bcrypt.hashSync(item, 10);
  return hashed;
}
function compare(plain: string, hashed: string) {
  const comparison = bcrypt.compareSync(plain, hashed);
  return comparison;
}
function createToken(user: userRepository.UserAuthData) {
  const pass = process.env.PASS_SECRET;
  const config = { expiresIn: 60 * 60 * 24 };

  const token = jwt.sign(user, pass, config);

  return token;
}
