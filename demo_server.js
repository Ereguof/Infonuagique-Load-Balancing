const http = require('http');
const os = require('os');
const url = require('url');

const PORT = process.env.PORT || 3000;
const SERVER_NAME = process.env.SERVER_NAME || 'Generic';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${SERVER_NAME}</title>
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Roboto', Arial, sans-serif;
          background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
          margin: 0;
          padding: 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .container {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          padding: 2rem 2.5rem;
          text-align: center;
        }
        h1 {
          color: #6366f1;
          margin-bottom: 0.5rem;
        }
        .server {
          font-size: 1.25rem;
          color: #2563eb;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }
        .info-links a {
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
          margin: 0 0.5rem;
          transition: color 0.2s;
        }
        .info-links a:hover {
          color: #2563eb;
        }
        .details {
          margin-top: 2rem;
          font-size: 0.95rem;
          color: #64748b;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>HAProxy Load Balancing Demo</h1>
        <div class="server">Cette page est servie par le serveur : <span>${SERVER_NAME}</span></div>
        <div class="details">
          <p>Port du serveur en arrière-plan : <b>${PORT}</b></p>
        </div>
      </div>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`${SERVER_NAME} running at http://localhost:${PORT}/`);
});
