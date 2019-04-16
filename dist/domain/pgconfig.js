"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const psychopiggy_1 = require("psychopiggy");
const config = {
    database: process.env.XNIPPET_PG_DB,
    host: process.env.XNIPPET_PG_HOST,
    password: process.env.XNIPPET_PG_PASSWORD,
    port: process.env.XNIPPET_PG_PORT
        ? parseInt(process.env.XNIPPET_PG_PORT, 10)
        : 5432,
    user: process.env.XNIPPET_PG_USER
};
psychopiggy_1.default.createPool(config);
exports.default = config;
//# sourceMappingURL=pgconfig.js.map