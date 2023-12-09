//IMPORTS (require = import) beinportalja az express es path modulet
const express = require('express')
const path = require('path')    


//app neven elinditjuk az express modulunkat
const app = express()

//meghatarozzuk a 'port' valtozot
const port = 3000

//fogja es az adott requesteket atalakitja jsonne, middleware, ehhez a requestnel be kell allitani a headersben a content typeot : application/json harert (a postmanben kell beallitani
app.use(express.json())

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

app.get('/users/:userid/', (req, res) => {
//res.send(req.params.userid) //: utani resz userid neven jon letre a backenden a request paramsban 
//a bejovo parametert atalakitom szamma

const userId = parseInt(req.params.userid)

//lecsekkolom hogy sikerult e szamma alakitani
if (isNaN(userId)) {
  console.log(`user id is not a number ${userId} `)

  //ha nem sikerult kuldok egy hibat a frontendnek
  res.status(400).send('userId must be a number!!!')
} else { //ha sikerult atalakitani futtatom tovabb a kodot 
  console.log('reading file...')

  //beolvasom a user json filet 
  fs.readFile(path.join(__dirname, '/data/users.json'), 'utf8', (err, data) => {
    //ha hibat talaltam a file olvasas kozben 
    if (err){
      console.log('error at reading file')

      res.status(500).send('error at reading file')

      //ha nincs hiba akkor van data
    } else  {
      console.log(`reading file was succesfull, serarching for user id: ${userId}`)

      //a data erteke string atalakitom jsben hasznaltahto tipussa (object, array
      const users = JSON.parse(data)

      //megkeresem az adott userId-t a users adatban
      const foundUser = users.find((user) => user.id === userId)

      if (foundUser) {/*truthy erteket keresel pl. object*/
    console.log(`found user id ${userId}, data ${foundUser}`)
  res.status(200).send (foundUser)
    } else {/*falsy erteke van pl. undefined*/
  console.log(`user id ${userId} was not found!`)}
  }
})
}
})

//elkezdi figyelni az adott portot a szamitogepen (localhost vagy 127.0.0.1:port)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('user/new-user', (req, res) => {
console.dir(req)

res.send('ok')
})