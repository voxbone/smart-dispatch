var express = require('express');
var router = express.Router();
var url = require('url');
var http = require('https');
var request = require('request');
var dids = [];

/* GET Userlist page. */
router.get('/userlist:segment', function(req, res) {
    var db = req.db;
    var urlParts = url.parse(req.url, true, true);
    var pathname = urlParts.pathname;
    var segment = pathname.slice(10);
    console.log(segment);
    var collection = db.get('usercollection');
    collection.findOne({segment: segment},function(e,docs){
        res.send({
            "userlist" : docs
        });
    });
});

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {},function(e,docs){
        res.send({
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/dashboard', function(req, res) {
    dids = [];
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {},function(e,docs){
        request(
        {
            //List available DIDs
            url : "https://username:password@api.voxbone.com/ws-voxbone/services/rest/inventory/did?pageNumber=0&pageSize=10",
            headers: { 'Accept':'application/json'}
        },
        function (error, response, body) {
            // Do more stuff with 'body' here
            body = JSON.parse(body);
            var somedids = body.dids;
            // console.log(somedids[0].e164);
            for (var i = 0; i < somedids.length; i++) {
                var adid = somedids[i];
                dids.push(adid.e164);
            };
            console.log(dids);
        }
    );
        setTimeout(function(){
        res.render('newuser',{
            "userlist" : docs, "dids":dids
        });
        }, 500);
    });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userFirstName = req.body.firstname;
    var userLastName = req.body.lastname;
    var userSegment = req.body.segment;
    var userPhone = req.body.number;
    var userDid = req.body.did;
    var userEmail = req.body.email;


    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "firstname" : userFirstName,
        "lastname" : userLastName,
        "segment" : userSegment,
        "number" : userPhone,
        "did" : userDid,
        "email" : userEmail


    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("/dashboard");
        }
    });
});

/* POST to Remove User Service */
router.post('/removeuser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var id = req.body.id;
    console.log(req.body.id);
    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.remove({"_id": id}, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("/dashboard");
        }
    });
});

module.exports = router;