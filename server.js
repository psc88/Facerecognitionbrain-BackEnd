const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const { json } = require('body-parser');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'lautaro13',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res)=> {
    res.send(database.users);
})

//otra forma de hacerlo es haciendo una funcion que llame otra funcion 
app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(3001, () => {
    console.log('app is running on port 3000')
})


/*

/         --> res = this is working
/signin   --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET =user
/image --> PUT --> user

*/

//con esto podemos encriptar la contraseña---------------
// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
//     });
//--------------------------------------------------------

//con esto podemos comprar el hash de el primero parmetro con el segundo
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
//     });