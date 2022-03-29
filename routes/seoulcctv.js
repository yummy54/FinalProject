const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const CircularJSON = require('circular-json');
const request = require('request');

var SeoulCctvSchema = mongoose.Schema({
    name:String, // 이름
    gu:String, // 구
    address:String, // 주소
    detail:String,  // 상세주소
    latitude:String, // 위도
    longitude:String // 경도
  },
    {
      collection : 'seoulcctv'
  });

var SeoulCctv = mongoose.model('SeoulCctv', SeoulCctvSchema);

router.get('/', function(req, res, next) {
    SeoulCctv.find({},{_id : 0, latitude : 0, longitude : 0}, function(err,docs){
         if(err) console.log('err');
         var template = `
         <html>
         <head>
            <title>Result</title>
            <meta charset="utf-8">
         </head>
         <body>
         <center>
          <table border="1" margin:auto; text-align:center;>
            <tr>
            <th>주차장명</th>
            <th>구</th>
            <th>동</th>
            <th>상세주소</th>
            </tr>
            `;
            for(var i = 0; i < docs.length; i++){
              template += `
              <tr>
                <th>${docs[i]['name']}</th>
                <th>${docs[i]['gu']}</th>
                <th>${docs[i]['address']}</th>
                <th>${docs[i]['detail']}</th>
              </tr>
              `;
            }
            template +=`
              </table>
            </body>
            </html>
            `;
            res.send(template);
    });
  });

  module.exports = router;


