// Requires
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
var querystring = require("querystring");

var config = {
  peers: ['https://cdneos2401.hextech.io','https://cdneos2402.hextech.io'],
  upstream: 'https://www.hexcapitalgroup.com',
  port: 3000,
  seed: 0,
  nodePattern: /(\w{1,}\d{4,}\.)[\s\S]+|^127(\.[\d]{1,3}){3}(:\d+)?/,
  timeOut: 12000,
  cacheDir: '/dev/shm/cdnnode'
};

function http404(req, res){
  res.writeHead(404, { 'Content-Type':  'application/json' });
  res.end('{"code":404,"msg":"File not found"}', 'utf-8');
}

function http500(req, res){
  res.writeHead(500, { 'Content-Type':  'application/json' });
  res.end('{"code":500,"msg":"Internal error"}', 'utf-8');
}

function http200(req, res, filePath, content){
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
  }
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(content, 'utf-8');
}

function redirect_to_peer(req,res){
  l=config.seed++ % config.peers.length;
  console.log(l);
  var server=config.peers[l];
  res.writeHead(302, {Location: server + req.url});
  res.end("\n", 'utf-8');
}

function serve_or_redirect(req,res,filePath, content){
  var host=""+req.headers.host;
  //disable redirect
  if(true || host.replace(config.nodePattern,"")==""){
    http200(req, res,filePath, content);
  }else{
    redirect_to_peer(req,res);
  }
}

function create_dir(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  create_dir(dirname);
  fs.mkdirSync(dirname);
}

function escape_url(url){
  return querystring.stringify(url).replace(/[^\.]+\.\.\/|\.{1,2}\//g,"");
}

function download_file(req,res,filePath){
  var host=""+req.headers.host;
  var request = https.get(config.upstream+req.url, function(req2) {
    if (req2.statusCode === 200) {
      create_dir(filePath);
      var file = fs.createWriteStream(filePath);
      req2.on('data',function(data){
        file.write(data);
      });
      req2.on('end', function() {
        file.close();
        fs.readFile(filePath, function(error2, content) {
          serve_or_redirect(req,res,filePath, content);
        });
      });
    }
    // Add timeout.
    request.setTimeout(config.timeOut, function () {
      request.abort();
      http404(req, res);
    });
  });
}

function serveFile(req, res){
  var filePath = config.cacheDir + escape_url(req.url);
  var host=""+req.headers.host;
  fs.readFile(filePath, function(error, content) {
    if (error) {
      if(error.code == 'ENOENT'){
        download_file(req,res,filePath)
      } else {
        http500(req, res);
      }
    } else {
      serve_or_redirect(req,res,filePath, content);
    }
  });
}

http.createServer(function (req, res) {
  serveFile(req, res);
}).listen(config.port);

console.log('cdnEOS node running at http://127.0.0.1:'+config.port);
