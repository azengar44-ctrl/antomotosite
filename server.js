const http = require('http');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'messages.json');

function readMessages(){
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch(e){
    return [];
  }
}

function saveMessages(list){
  fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2));
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/messages') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const all = readMessages();
        all.unshift({
          id: Date.now(),
          name: data.name || 'Anonyme',
          email: data.email || '',
          message: data.message || '',
          source: data.source || '',
          created_at: new Date().toISOString()
        });
        saveMessages(all);
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify({ok:true}));
      } catch(err){
        res.writeHead(400, {'Content-Type':'application/json'});
        res.end(JSON.stringify({error:'bad request'}));
      }
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/messages') {
    if (req.headers['x-admin-token'] !== 'secret123') {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    const all = readMessages();
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(all));
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

