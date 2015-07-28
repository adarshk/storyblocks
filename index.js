var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');
var fs = require('fs');

var done = false;

var lastPhoto = "";
var lastFile = "";
var lastJson = "";

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    // res.sendFile('StoryBlocks.html');
    // res.sendFile('StoryBlocks.html', { root: path.join(__dirname, '../StoryBlocks/') });
    res.sendFile(__dirname + '/StoryBlocks.html');
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
  if(done === true){
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


app.listen(3000);