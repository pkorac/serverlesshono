import { Hono } from "hono";
import { handle } from "@hono/node-server/vercel";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const app = new Hono();

app.get("/", (c) => {
	const connectionString = process.env.DB_CONNECTION_STRING as string;
	const client = postgres(connectionString, { prepare: false });
	const drizzleClient = drizzle(client);
	return c.text(`Hello, Vercel! ${connectionString}`);
});

app.get("/hello/:name", (c) => {
	return c.text(`Hello, ${c.req.param("name")}!`);
});

export default handle(app);
