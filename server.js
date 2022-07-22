const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/tabsera.com/privkey3.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/tabsera.com/cert3.pem')
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
    
  }).listen(3005, err => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3005');
  });
});