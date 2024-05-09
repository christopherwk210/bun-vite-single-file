const app = document.getElementById('app')!;

async function main() {
  // Things are setup so the origin is where our API lives
  const serverURL = location.origin + '/api';
  const response = await fetch(serverURL + '/message'); // /api/message
  const text = await response.text();
  app.innerHTML += `<p>${text}</p>`;
}

main();