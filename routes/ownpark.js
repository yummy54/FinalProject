var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
       var template = `
       <!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta http-equiv="X-UA-Compatible" content="IE=edge">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Document</title>
           <link rel="stylesheet" href="stylesheets/ownparktable.css">
           <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'> 
	         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
           <link rel="stylesheet" href="stylesheets/ownparkpage.css">
       </head>
       <body>
          <center>
            <img src="images/ownparklogo.png" width="300" height="300">
          </center>
       <section class="ftco-section">
       <div class="container">
             <div class="row justify-content-center">
               <div class="col-md-6 text-center mb-5">
               </div>
             </div>
            <div class="row">
               <div class="col-md-12">
                   <table class="table table-bordered table-dark table-hover">
                   <thead>
                     <tr>
                       <th>No.        </th>
                       <th>주차장명   </th>
                       <th>기본요금   </th>
                       <th>시간       </th>
                     </tr>
                   </thead>
                 </div>
              </div>
          </div>
                   
                   
        </body>
       </html>
          `;
          res.send(template);
  });

module.exports = router;