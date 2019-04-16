import psychopiggy from "psychopiggy";

const config = {
  database: process.env.XNIPPET_PG_DB as string,
  host: process.env.XNIPPET_PG_HOST as string,
  password: process.env.XNIPPET_PG_PASSWORD as string,
  port: process.env.XNIPPET_PG_PORT
    ? parseInt(process.env.XNIPPET_PG_PORT, 10)
    : 5432,
  user: process.env.XNIPPET_PG_USER as string
};

psychopiggy.createPool(config);

export default config;