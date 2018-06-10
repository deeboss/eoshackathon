var express = require('express');
var app = express();
var Eos = require('eosjs'); // Eos = require('./src')
var sleep = require('sleep');
const shell = require('shelljs');

wif = '5JRNfqrCrMkm6SXKeL4jWiZ8gsNqAgc9HCNE7qMLF8BuTQt3Jee'
pubkey = 'EOS7iYp3PebHzAgTZ6JqLpjoF1hkWj2McJtVrCz37PsxQCfbTi5Ww'

eos = Eos({keyProvider: wif})

app.get('/balances', function (req, res)   {

  eos.getTableRows({
    code:'cdneos',
    scope:'cdneos',
    table:'accounts',
    json: true,
  }).then(function(res1) {
      console.log(res1);
      res.send( res1 );
  });

})

app.get('/actions', function (req, res)   {

  eos.getActions('cdneos').then(function(res1) {
      console.log(res1);
      res.send( res1 );
  });

})


app.get('/registerurl1', function (req, res)   {
  //const args = request.params.args
  //console.log(args)

  shell.exec('cleos push action cdneos registerurl \x27[ \x22www.hex.com\x22, 1, \x22sig1\x22, \x22publisher1\x22, 1, \x22cdneos\x22 ]\x27 -p publisher1', function(code, stdout, stderr) {
    console.log('Program output:', stdout);
    res.send(stdout);
    // shell.exit(1);
  });

})


//  void serveurl( string url, account_name publisher, account_name cdn_node_owner, uint64_t payment)
app.get('/serveurl', function (req, res)   {
  //const args = request.params.args
  //console.log(args)
  console.log("Called: serveurl");
  var cmd = 'cleos push action cdneos serveurl \x27[ \x22www.hex.com\x22, \x22publisher1\x22, \x22cdnnode1\x22, 1 ]\x27 -p publisher1';
  console.log(cmd);
  shell.exec('cleos push action cdneos serveurl \x27[ \x22www.hex.com\x22, \x22publisher1\x22, \x22cdnnode1\x22, 1 ]\x27 -p publisher1', function(code, stdout, stderr) {
    console.log('Program output:', stdout);
    res.send(stdout);
    // shell.exit(1);
  });

})

//app.get('/registerurl', function (req, res)   {
//
  //returns Promise
//  eos.transaction({
//   actions: [
//     {
//       account: 'cdneos',
//       name: 'getbal',
//       authorization: [{
//         actor: 'rafal',
//         permission: 'active'
//       }],
//       data: {
//         owner: 'rafal'
//       }
//     }
//   ]
//  })
//
//})



app.get('/serveurl1/:url/:publisher/:cdnnode/:amount', function (req, res)   {
  //const args = request.params.args
  //console.log(args)
  console.log("Called: serveurl");
  console.log(req.params.url);
  console.log(req.params.publisher);
  console.log(req.params.cdnnode);
  console.log(req.params.amount);
  var cmd1 = 'cleos push action cdneos serveurl \x27[ \x22' + req.params.url + '\x22, \x22' + req.params.publisher + '\x22, \x22' + req.params.cdnnode + '\x22,' + req.params.amount + ']\x27 -p publisher1';
  // var cmd =  'cleos push action cdneos serveurl \x27[ \x22www.hex.com\x22, \x22publisher1\x22, \x22cdnnode1\x22, 1 ]\x27 -p publisher1';

  console.log(cmd1);
  // sleep.sleep(4);
  shell.exec(cmd1, function(code, stdout, stderr) {
    console.log('Program output:', stdout);
    res.send(stdout);
    // shell.exit(1);
  });

})


//this.eos.getActions('cdneos').then(function(res) {
//    console.log(res);
//  });
//  //const result = await eos.getTableRows(true, 'account', 'account', 'accounts');
//  // console.log(result);
//}



//eos = Eos({keyProvider: 'PW5J5cXz33Ri3q5n8cgNirZ5r8GrwHN2RA2aebrPDfn78wxgcBEub'})
// const result = await eos.getTableRows(true, 'todo', 'todo', 'todos');
// expect(result.rows).to.be.an('array');
// returns Promise
// eos.transaction({
//   actions: [
//     {
//       account: 'cdneos',
//       name: 'getbal',
//       authorization: [{
//         actor: 'rafal',
//         permission: 'active'
//       }],
//       data: {
//         owner: 'rafal'
//       }
//     }
//   ]
// })

//app.get('/registerurl', function (req, res)   {

//  eos.getTableRows({
//    code:'cdneos',
//    scope:'cdneos',
//    table:'accounts',
//    json: true,
//  }).then(function(res1) {
//      console.log(res1);
//      res.send( res1 );
//  });

//})


var server = app.listen(3006, '0.0.0.0', function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
