import psychopiggy from "psychopiggy";

const config = {
  database: process.env.SNIPGET_PG_DB as string,
  host: process.env.SNIPGET_PG_HOST as string,
  password: process.env.SNIPGET_PG_PASSWORD as string,
  port: process.env.SNIPGET_PG_PORT
    ? parseInt(process.env.SNIPGET_PG_PORT, 10)
    : 5432,
  user: process.env.SNIPGET_PG_USER as string
};

psychopiggy.createPool(config);

export default config;