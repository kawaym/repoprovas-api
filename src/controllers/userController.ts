import { Request, Response } from "express";

import * as userService from "../services/userService.js";

export async function create(req: Request, res: Response) {
  const { user } = req.body;

  try {
    await userService.create(user);
    res.sendStatus(201);
  } catch (e) {
    if (e === "internal_server_error") {
      res.sendStatus(500);
    } else if (e === "conflict") {
      res.sendStatus(409);
    } else {
      res.sendStatus(404);
    }
  }
}

export async function login(req: Request, res: Response) {
  const { user } = req.body;

  try {
    const token = await userService.login(user);
    res.status(200).send(token);
  } catch (e) {
    res.sendStatus(500);
  }
}

export async function validateSession(req: Request, res: Response) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    await userService.validateSession(token);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(401);
  }
}
