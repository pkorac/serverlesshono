import { Hono } from "hono";
import { handle } from "@hono/node-server/vercel";

const app = new Hono();

app.get("/", (c) => {
	return c.json({ message: "Hello Hono!" });
});

export default handle(app);
