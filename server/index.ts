import { exec } from 'node:child_process';

// Determine dev mode from CLI arg
const dev = Bun.argv.includes('--dev');
const prod = !dev;

// If in production, load the embeded HTML file with a dynamic import to prevent the file from being embeded during development
let defaultResponse: any = 'Currently in development mode!';
if (prod) {
  const { contents } = await import('./build');
  defaultResponse = contents;
}

const server = Bun.serve({
  // Force port 3000 in development so vite can proxy requests
  port: prod ? 0 : 3000,

  fetch(req: any) {
    const url = new URL(req.url);

    // Sample API route
    if (url.pathname === '/api/message') {
      return new Response('Hello from bun!', {
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // All other routes should serve the HTML file
    return new Response(defaultResponse, {
      headers: { 'Content-Type': 'text/html' }
    });
  },
});

console.log(`Server ready on port ${server.port}!`);

// If in production, open the browser automatically
let openString = 'start';
if (process.platform === 'darwin') openString = 'open';
if (process.platform === 'linux') openString = 'xdg-open';
if (prod) exec(`${openString} http://localhost:${server.port}`);