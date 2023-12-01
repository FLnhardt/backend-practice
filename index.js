//IMPORTS (require = import) beinportalja az express es path modulet
const express = require('express')
const path = require('path')    


//app neven elinditjuk az express modulunkat
const app = express()

//meghatarozzuk a 'port' valtozot
const port = 3000


// a localhost:port vagy a 127.0.0.1:port felkeresesekor elerhetove tesszuk az indexet
app.get('/', (req, res) => {
    //elkuldjuk az adott helyen levo fajlunkat
  res.sendFile(path.join(__dirname, 'frontend/index.html'))
})


//a localhost:port/style.css vagy 127.0.0.1:port/style.css felkeresesekorelerhetove tesszuk a style.css fajlunkat
app.get('/style.css', (req, res) => {
res.sendFile(path.join(__dirname, 'frontend/static/css/style.css'))
})

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/static/js/script.js'))
    })

app.get('/users', (req, res) => {
        res.sendFile(path.join(__dirname, 'data/users.json'))
        })


// /public cimen elerhetove tesszuk a /frontend/static mappank tartalmat 
    app.use('/public', express.static(path.join(__dirname, 'frontend/static')))

app.get('/users/:userid/dx', (req, res) => {
res.send(req.params.userid) //: utani resz userid neven jon letre a backenden a request paramsban 
})

//elkezdi figyelni az adott portot a szamitogepen (localhost vagy 127.0.0.1:port)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})