const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys= require('./config/keys');

const app = express();

//console.developers.google.com

passport.use(
    new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken,refreshToken,profile,done)=>{
        console.log('access token',accessToken);
        console.log('refreshToken',refreshToken);
        console.log('profile',profile);
        console.log('done',done);
    })
);

app.get('/auth/google',
    passport.authenticate('google',{
        scope: ['profile','email']
  })
);

app.get('/auth/google/callback',passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);