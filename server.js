const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3006
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const app = express()

app.use(express.static("public"));

app.get('*', function (request, response){
  response.sendFile(path.resolve("./", "public", 'index.html'))
})

const server = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/tabsera.com/privkey3.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/tabsera.com/cert3.pem', 'utf8')
},app)

console.log("server --> ", server)

server.listen(port)

 
})



