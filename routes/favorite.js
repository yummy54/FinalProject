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
           <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'> 
	         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
           <link rel="stylesheet" href="stylesheets/favoritepage.css">
           <link rel="stylesheet" href="stylesheets/button.css">
           <link rel="stylesheet" href="stylesheets/checkbox.css">
       </head>
       <body>
       <a href="/"><img src="images/parkinglogo.png" width="300" height="300"></a>
          <center>
            <img src="images/favoritelogo.png" width="300" height="300" style="margin-top: -250px">
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
                       <th><div class="checkbox-group">
                       <input type="checkbox" id="custom-checkbox" class="custom-checkbox">
                       <span class="custom-checkbox-span" tabindex="0"></span>
                        </div></th>
                       <th>No.        </th>
                       <th>주차장명   </th>
                       <th>주소   </th>
                     </tr>
                   </thead>
                   </table>
                 </div>
              </div>
          </div>
          
           <center>           
              <a href="#" class="btn btn-1">삭제</a>
           </center>  
        </body>
       </html>
          `;
          res.send(template);
  });

module.exports = router;