
var https = require('https');
var fs = require('fs');

const next = require('next')
//const port = parseInt(process.env.PORT, 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()


var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/tabsera.com/privkey3.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/tabsera.com/cert3.pem')
   // ca: [fs.readFileSync('root.crt')]
};

app.prepare().then(() => {
    https.createServer(options, (req, res) => {
        // handle ....
    }).listen(3006, err => {
        if (err) throw err
        console.log(`> Ready on localhost:${3006}`)
    })
})
