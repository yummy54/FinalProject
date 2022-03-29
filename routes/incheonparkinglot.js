const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const CircularJSON = require('circular-json');
const request = require('request');

var IncheonParkingSchema = mongoose.Schema({
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
      collection : 'incheon'
  });

  var IncheonParking = mongoose.model('IncheonParking', IncheonParkingSchema);

  router.get('/', function(req, res, next) {
    IncheonParking.find({},{_id : 0},function(err,docs){
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
            `;
            for(var i = 0; i < docs.length; i++){
              template += `
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
              `;
            }
            template +=`
              </table>
            </body>
            </html>
            `;
            res.end(template);
            res.render('incheon', { title: 'Express' });
    });
});

module.exports = router;