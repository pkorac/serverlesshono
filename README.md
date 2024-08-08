# NodeJS Severless Hono on Vercel

This is a simple example of a hono API using **nodejs serverless functions** instead of edge for deployment on vercel.
No Next.js, no extra stuff.


## Not on Edge
Deployign to edge is not always an option – for example when using drizzle and connecting to postgress, the javascript libraries need the nodejs apis.
In this case you will need to deploy on "classic" serverless function instead.


## Deployment settings/config

I've used the default hono/vercel template and channged/added the following things:


Package.json
```json
{
	"type": "module",
}
```

.env file
```bash
NODEJS_HELPERS=0
```


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
and then remove the .basePath from my index.ts so it looks like this:
```ts
const app = new Hono();
```

Have fun,
Peter Koraca
[Createive Crow](https://www.creativecrow.io)