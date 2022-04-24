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
      console.log(e);
      res.sendStatus(404);
    }
  }
}
