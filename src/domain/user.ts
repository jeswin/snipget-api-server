import { getConfig } from "./pgconfig";
import * as psychopiggy from "psychopiggy";

export interface ICreateUserArgs {
  username: string;
  password: string;
  name: string;
  email: string;
}

export async function createUser(args: ICreateUserArgs) {
  await psychopiggy.withTransaction(async client => {
    const userParams = new psychopiggy.Params({
      username: args.username,
      name: args.name,
      email: args.email
    });

    await client.query(
      `INSERT INTO user (${userParams.columns()}) VALUES (${userParams.ids()})`,
      userParams.values()
    );

    const credentialParams = new psychopiggy.Params({
      username: args.username,
      name: args.name,
      email: args.email
    });

    await client.query(
      `INSERT INTO credential (${credentialParams.columns()}) VALUES (${credentialParams.ids()})`,
      credentialParams.values()
    );
  });
}
