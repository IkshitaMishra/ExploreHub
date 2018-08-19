'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('Tgi4E-SNkEF3wfNpjxOtBs3PHc1yJsalpBkt43ToFilaIqL-81IpP_SqbsuStkH1V5uYziMvyksxzttxZR8Y7nXGwNmCkYcFZHR4o2OObdwg8wHElud_Pr2si2XMWnYx');

const express = require('express')
var parse= require('body-parser');
var request = require('request');
//var liveServer = require("live-server");
const pipe = require('pipe-functions');
var http = require('http');
const serve   = require('express-static');
var app = express();
app.use(parse.urlencoded({extended:true}));
app.use(express.static('my-app'));
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
var key;
var cat;
var dist;
var lat;
var lon;
var add;
var apikey;
var finalLatLon;var radius1;var currentlat;var currentlon; var currentlatlon; var method; var placeSearch;
var radius;var finalLatLon; var geocode; var obj;var enteredLat; var enteredLng;
var apikey = "AIzaSyB_80UHaL3Lg0Z681PxVXPPTr_Tcg4FzIs";
app.get('/', function(req, res)
{
 key = req.query.keyword;
 cat = req.query.cat;
 radius1 =req.query.distance * parseFloat(1609.34);
 radius = parseFloat(radius1);
 currentlat= req.query.currentlat;
  currentlon= req.query.currentlon;
  currentlatlon = currentlat + "," + currentlon;
 add =  req.query.address;
method =  JSON.stringify(req.query.method);
console.log('received' + key);
console.log('received' + cat);
console.log('received' + radius);
console.log('received' + currentlatlon);
console.log('received' + method);
console.log('received' + add);

if (req.query.method === "here") {
   placeSearch = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+currentlatlon+"&radius="+radius+"&type="+cat+"&keyword="+key+"&key="+apikey;
   request(placeSearch, function (error, response, body) {
   if (!error && response.statusCode == 200) {
   // Logging the output within the request function
   console.log(body);
   res.json(body);
   }
   });
 }
 else {
   geocode = "https://maps.googleapis.com/maps/api/geocode/json?address="+add+"&key="+apikey;
   request(geocode, function (error, response, body) {
   if (!error && response.statusCode == 200) {
   console.log(body);
   obj = JSON.parse(body);
   enteredLat = JSON.parse(obj.results[0].geometry.location.lat);
   enteredLng = JSON.parse(obj.results[0].geometry.location.lng);
   finalLatLon = enteredLat + "," + enteredLng;
   }
   console.log("finalLatLon" + finalLatLon);
   placeSearch = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+finalLatLon+"&radius="+radius+"&type="+cat+"&keyword="+key+"&key="+apikey;
   request(placeSearch, function (error, response, body) {
   if (!error && response.statusCode == 200) {
     console.log(body); // Logging the output within the request function
     res.json(body);
   }
   });
   });
 }
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

var token; var nextplaceSearch;
app.get('/nextpage', function(req, res)
{
  token = req.query.token;
  console.log('received' + token);
  nextplaceSearch = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="+token+"&key="+apikey;
  request(nextplaceSearch, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  // Logging the output within the request function
  console.log(body);
  res.json(body);
  }
  });
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

var addlatlng; var geocodealone;
app.get('/latlng', function(req, res)
{
   addlatlng =  req.query.addresslatlng;
  geocodealone = "https://maps.googleapis.com/maps/api/geocode/json?address="+addlatlng+"&key="+apikey;
  request(geocodealone, function (error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log(body);
  res.json(body);
   }
  });
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

var autolatlng; var geocodeauto;
app.get('/autolatlng', function(req, res)
{
   autolatlng =  req.query.autolatlngval;
  geocodeauto = "https://maps.googleapis.com/maps/api/geocode/json?address="+autolatlng+"&key="+apikey;
  request(geocodeauto, function (error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log(body);
  res.json(body);
   }
  });
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

var tokensecond; var nextplaceSearchsecond;
app.get('/nextpagesecond', function(req, res)
{
  tokensecond = req.query.tokensecond;
  console.log('received' + token);
  nextplaceSearchsecond = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="+tokensecond+"&key="+apikey;
  request(nextplaceSearchsecond, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  // Logging the output within the request function
  console.log(body);
  res.json(body);
  }
  });
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

var name;var address1;var address2; var city; var state; var country;
app.get('/yelpurl', function(req, res)
{
  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  client.businessMatch('best', {
  name: req.query.plname,
  address1: req.query.addr1,
  address2:  req.query.addr2,
  city:  req.query.plcity,
  state:  req.query.plstate,
  country:  req.query.plcount
}).then(response => {
    if( response && response.jsonBody.businesses && response.jsonBody.businesses.length) {
  client.reviews(response.jsonBody.businesses[0].id).then(response => {
    res.send(response.jsonBody);
  })
}
else {
   res.send(false);
}
}).catch(e=>{
console.log(e);
});
});

app.listen(3000, function() {
   console.log('Example app listening on port 3000!');
});
