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
           <link rel="preconnect" href="https://fonts.gstatic.com">
           <link href="https://fonts.googleapis.com/css2?family=Convergence&family=Lato:wght@300;400;700;900&family=Mukta:wght@300;400;600;700;800&family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet">
           <link rel="stylesheet" href="stylesheets/mypark.css">
           <link rel="stylesheet" href="stylesheets/button.css">
           <link href="https://fonts.googleapis.com/css?family=Poppins:600" rel="stylesheet">
       </head>
       <body>
           <br>
           <br>
           <div class="form">
               <input type="text" id="email" class="form__input" autocomplete="off" placeholder=" ">
               <label for="email" class="form__label">주차장 이름</label>
           </div>
       
           <div class="form">
               <input type="text" id="address" class="form__input" autocomplete="off" placeholder=" ">
               <label for="address" class="form__label">주차장 주소</label>
           </div>
       
           <div class="form">
               <input type="text" id="dong" class="form__input" autocomplete="off" placeholder=" ">
               <label for="dong" class="form__label">동</label>
           </div>
       
           <div class="form">
               <input type="text" id="basic_time" class="form__input" autocomplete="off" placeholder=" ">
               <label for="basic_time" class="form__label">기본시간</label>
           </div>
       
           <div class="form">
               <input type="text" id="basic_fee" class="form__input" autocomplete="off" placeholder=" ">
               <label for="basic_fee" class="form__label">기본요금</label>
           </div>
           
           <div class="buttons">
               <a href="#" class="btn btn-1">추가</a>
           </div>
        </body>
       </html>
          `;
          res.send(template);
  });

module.exports = router;