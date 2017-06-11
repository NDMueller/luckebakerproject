//=== Require Dependencies ==================================
const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , cors = require('cors')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , config = require('./config')
    , path = require('path')
    ;


//=== Initialize App ========================================
const app = module.exports = express();
const port = 4000;
app.use(bodyParser.json());
app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: 'keyboardcat'
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.static('./dist'));

//=== Database ==============================================
var massiveInstance = massive.connectSync(config.massiveConnection);
app.set('db',massiveInstance)
var db = app.get('db');

passport.use(new Auth0Strategy({
    domain: config.auth0.domain,
    clientID: config.auth0.clientID,
    clientSecret: config.auth0.clientSecret,
    callbackURL: '/auth/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    //Find user in database
    db.getUserByAuthId([profile.id], function (err, user) {
      user = user[0];
      if (!user) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        db.createUserByAuthId([profile.id,profile.name.givenName,profile.emails[0].value], function (err, user) {
          console.log('USER CREATED', user);
          return done(err, user[0]); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(err, user);
      }
    })
  }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function (userA, done) {
  console.log('serializing', userA);
  var userB = userA;
  //Things you might do here :
  //Serialize just the id, get other information to add to session,
  done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function (userB, done) {
  var userC = userB; // FIX THIS !!!!!!!!!!!!!!   var userC = userC doesn't work!
  //Things you might do here :
  // Query the database with the user id, get other information to put on req.user
  done(null, userC); //PUTS 'USER' ON REQ.USER
});



app.get('/auth', passport.authenticate('auth0'));


app.get('/auth/callback',
  passport.authenticate('auth0', {
    successRedirect: '/#!/recipes/submit'
  }),
  function (req, res) {
    res.status(200).send(req.user);
  })
  var isAuthed = function(req, res, next){
    if(!req.isAuthenticated()){
       return res.status(401).send("Not authenticated");
    }
    console.log("Authenticated");
    return next();
  }
app.get('/auth/me', function (req, res) {
  if (!req.user) return res.sendStatus(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
})

app.get('/auth/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})




//=== Controllers ===========================================

const recipeCtrl =require('./controllers/recipeCtrl');



// Lloyd said put something here?
//its here!
//===  Endpoints ========================================
app.get('/recipes',recipeCtrl.getRecipes)
app.post('/recipes/submit',recipeCtrl.addRecipe)









// VERY BOTTOM
//=== Listen ================================================
app.listen(port,()=>{console.log('Fire in the hole! ' +  port)});
