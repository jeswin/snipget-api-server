import { Context } from "koa";
import * as user from "../domain/user";
import { createContext } from "vm";

export async function getUser() {}

export async function createUser(context: Context) {
  const { username, password, name, email } = (context.request as any).body;
  await user.createUser({ username, password, name, email });
  context.body = "SAVED"!;
}

export async function removeUser() {}
