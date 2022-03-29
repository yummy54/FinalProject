const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CircularJSON = require('circular-json');

//define scheme
var FindParkingSchema = mongoose.Schema({
  name:String, //주차장명
  address:String, // 주차장 주소
  dong:String,
  num: String, //주차구획수
  opday:String, //운영요일
  wds:String, //평일 시작
  wde:String, //평일 마감
  hds:String, //주말 시작
  hde:String, //주말 마감
  bpt:String, //기본 주차 시간
  bpf:String, //기본 요금
  mpf:String, // 한달 주차 요금
},
  {
    collection : 'seoul'
});

var FindParking = mongoose.model('FindParking', FindParkingSchema);

router.post('/', function(req, res, next) {
  var dong = req.body.result;
  /*console.log(req.result)
  console.log(req.body.dong)

  console.log(dong)*/
  FindParking.find({'dong' : dong},{_id : 0},function(err,docs){
    if(err) console.log('err');
    var template = `
    <html>
    <head>
       <title>Result</title>
       <meta charset="utf-8">
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
       <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.15.5/dist/bootstrap-table.min.css">

    </head>
    <body>
    <center>
     <table data-toggle="table">
     <thead>
       <tr>
       <th>주차장명</th>
       <th>주차장 주소</th>
       <th>동</th>
       <th>주차대수</th>
       <th>운영요일</th>
       <th>평일시작</th>
       <th>평일종료</th>
       <th>주말시작</th>
       <th>주말종료</th>
       <th>기본시간</th>
       <th>기본요금</th>
       <th>월 요금</th>
       </tr>
       </thead>
       `;
       for(var i = 0; i < docs.length; i++){
         template += `
         <tbody>
         <tr>
           <th>${docs[i]['name']}</th>
           <th>${docs[i]['address']}</th>
           <th>${docs[i]['dong']}</th>  
           <th>${docs[i]['num']}</th>
           <th>${docs[i]['opday']}</th>
           <th>${docs[i]['wds']}</th>
           <th>${docs[i]['wde']}</th>
           <th>${docs[i]['hds']}</th>
           <th>${docs[i]['hde']}</th>
           <th>${docs[i]['bpt']}</th>
           <th>${docs[i]['bpf']}</th>
           <th>${docs[i]['mpf']}</th>
         </tr>
         </tbody>
         `;
       }
       template +=`
         </table>
         <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
         <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
         <script src="https://unpkg.com/bootstrap-table@1.15.5/dist/bootstrap-table.min.js"></script>
         </body>
       </html>
       `;
       res.send(template);
});
});
  
  module.exports = router;

