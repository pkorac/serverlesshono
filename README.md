# NodeJS Severless Hono on Vercel

This is a simple example of a hono API using **nodejs serverless functions** instead of edge for deployment on vercel. No Next.js, no extra stuff.


## Why not on Edge?
Deployign to edge is not always an option. For example when using drizzle to connect to a  postgres database – the javascript library need the nodejs apis.

In this case you will need to deploy on "classic" serverless function instead.


## Deployment Tips and Tricks

I've used the default hono/vercel template when creating the project and then channged/added the following things:

1.
Package.json
```json
{
	"type": "module",
}
```
This lets you use `import something from "something"` instead of `require("something")`

2.
.env file
```bash
NODEJS_HELPERS=0
```
This is needed to make sure that the serverless functions are not using the vercel's nodejs helpers for request, etc. Basically let Hono do Hono instead of Vercel's helpers.


3.
Install `@hono/node-server`
```
npm i @hono/node-server

… so you can later to
import { Hono } from "hono";
import { handle } from "@hono/node-server/vercel";
```
This let's you serve the app as node-js server would but on vercel.


4.
Remove `export const config…`
```ts
export const config = {
	runtime: "edge",
}; // <-- remove all this
```
This is so that vercel doesn't serve things on the edge.



### Running locally 

```bash
vercel dev
```

### Other usefull stuff

I wanted to serve my api from `mydomain.com/` instead of `mydomain.com/api/`, so I added the following rewrite rule to my vercel.json:
```json
{
	"rewrites": [
		{
			"source": "/(.*)",
			"destination": "/api"
		}
	]
}
```
and then remove the basePath() from my index.ts so it looks like this:
```ts
const app = new Hono();
```

Have fun,
Peter Koraca
[Createive Crow](https://www.creativecrow.io)