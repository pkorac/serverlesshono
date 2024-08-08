import { Hono } from "hono";
import { handle } from "@hono/node-server/vercel";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello, Vercel!");
});

app.get("/hello/:name", (c) => {
	return c.text(`Hello, ${c.req.param("name")}!`);
});

export default handle(app);
