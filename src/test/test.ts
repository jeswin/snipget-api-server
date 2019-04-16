import "mocha";
import "should";
import pg = require("pg");
import * as psychopiggy from "psychopiggy";
import { readFileSync } from "fs";
import { join } from "path";
import axios from "axios";
import serverInit from "../";

const shouldLib = require("should");
const request = axios.create({ baseURL: "http://localhost:1983" });

const [dropTablesSQL, createTablesSQL] = ["drop-tables", "create-tables"].map(
  filename =>
    readFileSync(join(__dirname, `../../pgschema/${filename}.sql`)).toString()
);

if (
  [
    process.env.SNIPGET_TESTDB,
    process.env.SNIPGET_HOST,
    process.env.SNIPGET_PASSWORD,
    process.env.SNIPGET_PORT,
    process.env.SNIPGET_USER
  ].some(x => typeof x === "undefined")
) {
  // tslint:disable:max-line-length
  throw new Error(
    `Test env variables are not set. You need to set SNIPGET_TESTDB, SNIPGET_HOST, SNIPGET_PASSWORD, SNIPGET_PORT and SNIPGET_USER`
  );
  // tslint:enable:max-line-length
}

const config = {
  database: process.env.SNIPGET_TESTDB,
  host: process.env.SNIPGET_HOST,
  password: process.env.SNIPGET_PASSWORD,
  port: process.env.SNIPGET_PORT
    ? parseInt(process.env.SNIPGET_PORT, 10)
    : 5432,
  user: process.env.SNIPGET_USER
};

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("psychopiggy", () => {
  // Create a database
  before(async function resetDb() {
    const pool = new pg.Pool({ ...config, database: "template1" });

    const {
      rows: existingDbRows
    } = await pool.query(`SELECT 1 AS result FROM pg_database
    WHERE datname='${config.database}'`);

    if (existingDbRows.length) {
      await pool.query(`DROP DATABASE ${config.database}`);
    }

    await pool.query(`CREATE DATABASE ${config.database}`);

    // Let's start the server
    serverInit(1983);
  });

  beforeEach(async function resetTables() {
    const pool = new pg.Pool(config);
    await pool.query(dropTablesSQL);
    await pool.query(createTablesSQL);
  });

  afterEach(async function resetPools() {
    await psychopiggy.endPools();
  });

  it("inserts ", async () => {
    const result = await request.post("/users", {
      username: "jeswin",
      email: "jeswinpk@agilehead.com",
      password: "secret",
      name: "Jeswin PK"
    });
    console.log(request);
    const params = new psychopiggy.Params({ username: "jeswin" });
    shouldLib.exist(params);
  });

  // it("creates a pool", async () => {
  //   psychopiggy.createPool({ ...config, user: "alice" });
  //   psychopiggy.createPool({ ...config, user: "bob" });
  //   const numPools = psychopiggy.internalNumPools();
  //   numPools.should.equal(2);
  // });

  // it("reuses a pool for existing config", async () => {
  //   psychopiggy.createPool({ ...config, user: "alice" });
  //   psychopiggy.createPool({ ...config, user: "alice" });
  //   const numPools = psychopiggy.internalNumPools();
  //   numPools.should.equal(1);
  // });

  // it("gets a pool and runs a query", async () => {
  //   psychopiggy.createPool(config);
  //   const pool = psychopiggy.getPool(config);
  //   const { rows } = await pool.query(
  //     `INSERT INTO account (
  //     username, password, email) VALUES ('jeswin', 'secretive', 'jeswin@example.com')`
  //   );
  // });

  // it("ends a pool", async () => {
  //   psychopiggy.createPool(config);
  //   const pool = psychopiggy.getPool(config);
  //   const { rows } = await pool.query(
  //     `INSERT INTO account (
  //     username, password, email) VALUES ('jeswin', 'secretive', 'jeswin@example.com')`
  //   );
  //   await psychopiggy.endPool(config);
  //   psychopiggy.internalNumPools().should.equal(0);
  // });

  // it("can use prepared statements", async () => {
  //   psychopiggy.createPool(config);
  //   const pool = psychopiggy.getPool(config);
  //   const params = new psychopiggy.Params({
  //     email: "jeswin@example.com",
  //     password: "helloworld",
  //     username: "jeswin"
  //   });
  //   const { rows } = await pool.query(
  //     `INSERT INTO account (${params.columns()}) VALUES (${params.ids()})`,
  //     params.values()
  //   );
  // });

  // it("returns a client", async () => {
  //   psychopiggy.createPool(config);

  //   const pool = psychopiggy.getPool(config);
  //   const { rows } = await pool.query(
  //     `INSERT INTO account (
  //     username, password, email) VALUES ('jeswin', 'secretive', 'jeswin@example.com')`
  //   );

  //   const result = (await psychopiggy.withClient(
  //     async client => await client.query(`SELECT * FROM account`),
  //     config
  //   )) as any;

  //   shouldLib.exist(result);

  //   result.rows.length.should.equal(1);
  //   result.rows[0].username.should.equal("jeswin");
  // });

  // it("commits a successful transaction", async () => {
  //   psychopiggy.createPool(config);

  //   const pool = psychopiggy.getPool(config);
  //   const { rows } = await pool.query(
  //     `INSERT INTO account (
  //     username, password, email) VALUES ('jeswin', 'secretive', 'jeswin@example.com')`
  //   );

  //   await psychopiggy.withTransaction(async client => {
  //     await client.query(`INSERT INTO account (
  //       username, password, email) VALUES ('jeswin1', 'secretive1', 'jeswin1@example.com')`);
  //     await client.query(`INSERT INTO account (
  //         username, password, email) VALUES ('jeswin2', 'secretive2', 'jeswin2@example.com')`);
  //   }, config);

  //   const result = (await psychopiggy.withClient(async client => {
  //     return await client.query(`SELECT * FROM account`);
  //   }, config)) as any;

  //   shouldLib.exist(result);

  //   result.rows.length.should.equal(3);
  //   result.rows[0].username.should.equal("jeswin");
  //   result.rows[1].username.should.equal("jeswin1");
  //   result.rows[2].username.should.equal("jeswin2");
  // });

  // it("rolls back an erroring transaction", async () => {
  //   psychopiggy.createPool(config);

  //   const pool = psychopiggy.getPool(config);
  //   const { rows } = await pool.query(
  //     `INSERT INTO account (
  //     username, password, email) VALUES ('jeswin', 'secretive', 'jeswin@example.com')`
  //   );

  //   await psychopiggy.withTransaction(async client => {
  //     client.query(`INSERT INTO account (
  //       username, password, email) VALUES ('jeswin1', 'secretive', 'jeswin1@example.com')`);
  //     throw new Error();
  //   }, config);

  //   const result = (await psychopiggy.withClient(async client => {
  //     return await client.query(`SELECT * FROM account`);
  //   }, config)) as any;

  //   shouldLib.exist(result);

  //   result.rows.length.should.equal(1);
  //   result.rows[0].username.should.equal("jeswin");
  // });
});
