var express = require('express');
var router = express.Router();
var WebRtcController = require('./webRTCController');
var webRtcController = new WebRtcController();
var http = require('http');
var request = require("request");
var url = require('url');
var passport = require('passport');
var util = require('util');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var LINKEDIN_API_KEY = "api-key";
var LINKEDIN_SECRET_KEY = "secret-key";
var showprofile = null;
var displayName = null;
var phoneNumber = null;
var location = null;
var email = null;
var position = null;
var company = null;
var did = null;
var agentNumber = 'hey';
var callDid = 'hey';
var pageurl = 'example.com';
var agentemail = 'example@voxbone.com';
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LinkedInStrategy({
  clientID: LINKEDIN_API_KEY,
  clientSecret: LINKEDIN_SECRET_KEY,
  callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile', 'r_contactinfo'],
  profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline', 'phone-numbers', 'location', 'positions']
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.

    showprofile = profile;
    displayName = profile.name.givenName + ' ' + profile.name.familyName;
    phoneNumber = profile._json.phoneNumbers.values[0].phoneNumber;
    location = profile._json.location.country.code;
    email = profile._json.emailAddress;
    position = profile._json.positions.values[0].title;
    company = profile._json.positions.values[0].company.name;

    return done(null, showprofile, displayName, phoneNumber, location, email, position, company, did);
  });
}));
router.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });
router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/an-example-of-a-url');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/an-example-of-a-url');
});

router.get('/an-example-of-a-url', function(req, res){
  var urlParts = url.parse(req.url, true, true);
  pageurl = urlParts.href;
  voxrtc_config = webRtcController.createKey();
  displayname = displayName;
  cid = phoneNumber;
  if (displayname != null) {
    getData(location);
    setTimeout(function(){
      console.log(callDid);
      console.log(agentNumber);
      console.log(agentemail);

    }, 500);
  };
  console.log(displayName);
  console.log(phoneNumber);
  console.log(email);
  console.log(position);
  console.log(company);
  console.log(location);

setTimeout(function(){
  res.render('index', { agentDid: callDid, agentNum: agentNumber, userName: displayName, userPhone: phoneNumber, userEmailAddress: email, userPos: position, userCo: company, userLoc: location, pageurl: pageurl, agentEmailAddress: agentemail  });
}, 500);

});

router.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

router.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

function  getData(location){
        request("http://localhost:4000/userlist:"+location, function(error, response, body) {
        body = JSON.parse(body);
        var adid = body.userlist.did;
        var aAgentNumber = body.userlist.number;
        var aAgentEmail = body.userlist.email;

        getDid(adid, aAgentNumber, aAgentEmail);
      });
};
function getDid(adid, aAgentNumber, aAgentEmail){
  callDid = adid;
  agentNumber = aAgentNumber;
  agentemail = aAgentEmail;
}

module.exports = router;
