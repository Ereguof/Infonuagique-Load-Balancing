const http = require('http');
const os = require('os');
const url = require('url');

const PORT = process.env.PORT || 3000;
const SERVER_NAME = process.env.SERVER_NAME || 'Generic';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', server: SERVER_NAME }));
    return;
  }
  if (parsedUrl.pathname === '/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: `Hello from ${SERVER_NAME}!`,
      hostname: os.hostname(),
      time: new Date().toISOString(),
      path: req.url,
      platform: os.platform(),
      uptime: os.uptime(),
      loadavg: os.loadavg(),
      memory: os.totalmem(),
      free: os.freemem()
    }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<h1>${SERVER_NAME} Demo</h1><p>Try <a href='/info'>/info</a> or <a href='/health'>/health</a></p>`);
});

server.listen(PORT, () => {
  console.log(`${SERVER_NAME} running at http://localhost:${PORT}/`);
});
