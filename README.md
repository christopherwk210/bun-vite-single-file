# bun-vite-single-file

Sample project that sets up Vite + Bun in a way that makes it easy to package a single file executable. Vite handles the front-end and Bun handles the server, communicating over a basic server on the same port using `location.origin`. During development, Vite proxies requests to `/api` to the Bun server. Production builds build the front-end project into a single html file that is embeded into a Bun executable. When compiled, the executable will serve the html file correctly from the server.

- `bun dev` will run the bun server and vite in development
- `bun run build` will produce a single `bin/app.exe` file