var express = require('express');
var app = express();
var Eos = require('eosjs') // Eos = require('./src')
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

app.get('/registerurl', function (req, res)   {

  //returns Promise
  eos.transaction({
   actions: [
     {
       account: 'cdneos',
       name: 'getbal',
       authorization: [{
         actor: 'rafal',
         permission: 'active'
       }],
       data: {
         owner: 'rafal'
       }
     }
   ]
  })

})


//})



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


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
