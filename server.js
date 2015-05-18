'use strict';
 
// simple express server
var express = require('express');
var multer = require('multer');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var http = require('http');
var fs = require('fs');


var zip = require('express-zip');

/*var zip = new require('node-zip')();
zip.file('test.txt','Hello');
var zipGenerate = zip.generate({base64:false,compression:'DEFLATE'});*/

/*fs.writeFile('test1.zip', zipGenerate, 'binary', function (error) {
  console.log('wrote test1.zip', error);
});*/


app.use(bodyParser.json());

//google  https://maps.googleapis.com/maps/api/geocode/json?address=Okmulgee+OK&key=AIzaSyDMLvEKnAZMZ9JlY6jJRgbdIsJE5YSamxY


var Twit = require('twit');

var done = false;

var lastPhoto = "";
var lastFile = "";
var lastJson = "";

var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
});

 
app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...');
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path);

  done=true;
}
}));


app.post('/file-upload',function(req,res){
  if(done==true){
    console.log('req.files',req.files);
    // console.log(__dirname);
    // res.sendFile(__dirname + '/' + req.files.file.path);
    //lastPhoto = __dirname + '/' + req.files.file.path;

    if(path.extname(req.files.file.path) == '.jpg' || path.extname(req.files.file.path) == '.png'){

    lastPhoto = req.files.file.path;
    console.log('lastPhoto',lastPhoto);

  }

  else if(path.extname(req.files.file.path) == '.csv' || path.extname(req.files.file.path) == '.json'){

    lastFile = req.files.file.path;

    // lastJson = JSON.parse(fs.readFileSync(lastFile, 'utf8'));

    fs.readFile(lastFile, 'utf8', function (err, data) {
      if (err) throw err;
      lastJson = JSON.parse(data);
    });
    // lastJson = require(req.files.file.path);
    console.log('lastFile',lastFile);
    console.log('lastJson',lastJson);

  }

  else{
    console.log('Nope');
    res.end(":( File not accepted");
  }

    res.sendStatus(200);
    // res.end("File uploaded.");
  }
});


app.get('/twittersearch', function(req, res) {
    console.log('received twitter search');

    var searchString = req.query["data"];
    console.log(searchString);

    var td = {};

    T.get('search/tweets', { q: searchString+' since:2011-11-11', count: 500 }, function(err, tweetdata, response) {
      
      // var td = tweetdata.toJSON();

      

      for(var d in tweetdata.statuses){

        // console.log(tweetdata.statuses[d]);

        
        // if(tweetdata.statuses[d].entities.media !== undefined && tweetdata.statuses[d].user.lang == "en"){
          if(tweetdata.statuses[d].entities.media !== undefined){

        if(tweetdata.statuses[d].user.location !== "" && tweetdata.statuses[d].entities.media[0].media_url !== ""){

        
          td[d] = {};
          td[d]["username"] = tweetdata.statuses[d].user.screen_name;

          if(tweetdata.statuses[d].coordinates !== null){
          td[d]["location"] = tweetdata.statuses[d].coordinates;
          }

          else{
           td[d]["location"] = tweetdata.statuses[d].user.location;
          }
          td[d]["tweettext"] = tweetdata.statuses[d].text;
          td[d]["img"] = tweetdata.statuses[d].entities.media[0].media_url;
        }

        else{
          console.log(tweetdata.statuses[d].user);
          continue;
        }

        console.log(td[d]);
        

      }

      else{
        continue;
      }

    }

    /*var counter = 0;
    function doSetTimeout(n,c) {
        setTimeout(function() {

          var address = "https://maps.googleapis.com/maps/api/geocode/json?address="+td[n]["location"]+
          "&key=AIzaSyDMLvEKnAZMZ9JlY6jJRgbdIsJE5YSamxY";
          
          var options = {
            hostname: '127.0.0.1'
            ,port: 3000
            ,path: address
            ,method: 'GET'
            ,headers: { 'Content-Type': 'application/json' }
          };


          var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                 console.log(data); 
                 var jsonObject = JSON.parse(data);
                 td[n]["location"] = jsonObject.results.geometry.location;
            });
          });

          // td[d]["location"] = tweetdata.statuses[d].user.location;


        }, c * 30);
      }

    for (var t in td){
      doSetTimeout(t,++counter);
    }*/

/*    var si = setInterval(function() { 



     }, 300);*/

      // res.json({data:tweetdata});
      // console.log(Object.keys(td).length);

      res.json(td);
      
    });

    
    
    // res.writeHead(200, {'Content-Type': 'image/jpeg' });
    // res.sendFile(lastPhoto);
    // res.end(lastPhoto, 'binary');
});

app.get('/last-photo', function(req, res) {
    console.log('last-photo received');
    res.writeHead(200, {'Content-Type': 'image/jpeg' });
    // res.sendFile(lastPhoto);
    res.end(lastPhoto, 'binary');
});

app.get('/last-file', function(req, res) {

  console.log('last-file received');
  console.log('lastJson',lastFile);
  // res.writeHead(200, {'mimetype': 'application/json' });
  res.json({data:lastJson});
    // res.writeHead(200);

    // res.json({data:});
    // res.sendFile(lastPhoto);
    // res.end(lastPhoto, 'binary');
    
});


app.get('/get-zip', function(req, res) {
    /*console.log('get-zip received');
    res.writeHead(200, {'Content-Type': 'text/plain' });
    // res.sendFile(lastPhoto);
    res.end(zipGenerate, 'binary');*/

    console.log("zip request received");

    res.zip([
      { path: 'testzip.txt', name:'testzip.zip' }

      ]);
});


app.use(express.static('./'));
app.get('/', function(req, res) {
    res.sendfile('./index.html');
});

app.get('/tweets', function(req, res) {
    
	T.get('search/tweets', { q: 'banana since:2011-11-11', count: 100 }, function(err, data, response) {
  	console.log(data);
  	res.json(data);
	});
    
});


app.post('/tweets', function(req, res) {
    
	T.get('search/tweets', { q: 'banana since:2011-11-11', count: 100 }, function(err, data, response) {
  	console.log(data);
  	res.json(data);
	});
    
});



function getTweets() {
	console.log("getTweets");
	T.get('search/tweets', { q: 'banana since:2011-11-11', count: 100 }, function(err, data, response) {
  		console.log(data);
});
}
 
app.listen(3000);




/*var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});*/