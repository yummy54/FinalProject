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
  var dong = req.body.dong;
  /*console.log(req.result)*/
  console.log(req.body.dong)

 /* console.log(dong)*/
  FindParking.find({'dong' : dong},{_id : 0},function(err,docs){
    if(err) console.log('err');
    var template = `
    <html>
    <head>
       <title>Result</title>
       <meta charset="utf-8">
       <link rel="stylesheet" href="stylesheets/table.css">
       <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'>
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script>
            function openpopup(i) {
                  $('.popup:eq('+i+')').css('opacity', '1');
                  $('.popup:eq('+i+')').css('visibility', 'visible');
              }

              function closepopup() {
                  $('.popup').css('opacity', '');
                  $('.popup').css('visibility', '');
              }
</script>
    </head>
    <body>
    <section class="ftco-section">
  <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5">
              <h2 class="heading-section">강남구 주차장</h2>
          </div>
        </div>
       <div class="row">
          <div class="col-md-12">
            <table class="table table-bordered table-dark table-hover">
              <thead>
                <tr>
                  <th>No.        </th>
                  <th>주차장명   </th>
                  <th>주차장 주소</th>
                  <th>동         </th>
                </tr>
              </thead>
              `;
              for(var i = 0; i < docs.length; i++) {
                template += `
                <div class="popup">
                  <div class="popup-content">
                        <div class="parkingnum">
                            주차구획수 : ${docs[i]['num']}
                        </div>
                        <div class="parkingopday">
                            운영요일 : ${docs[i]['opday']}
                        </div>
                        <div class="weekdaystart">
                            평일시작 : ${docs[i]['wds']}
                        </div>
                        <div class="weekdayend">
                            평일종료 :  ${docs[i]['wde']}
                        </div>
                        <div class="holidaystart">
                            주말시작 : ${docs[i]['hds']}
                        </div>
                        <div class="holidayend">
                            주말종료 : ${docs[i]['hde']}
                        </div>
                        <div class="standardtime">
                            기본시간 : ${docs[i]['bpt']}
                        </div>
                        <div class="standardcharge">
                            기본요금 : ${docs[i]['bpf']}
                        </div>
                        <div class="monthcharge">
                            월 요금 : ${docs[i]['mpf']}
                        </div>
                    <div class="head">
                      <div class="btn-close" onclick="closepopup();"></div>
                    </div>
                        <div class="body">
                          <tbody>
                            <tr>
                              <th scope="row">${i + 1}</th>
                              <td style="cursor:pointer;" onclick="openpopup(${i});">${docs[i]['name']}</td>
                              <td>${docs[i]['address']}</td>
                              <td>${docs[i]['dong']}</td>
                            </tr>
                          </tbody>
                  </div>
                </div>
                `;
              }
              template += `
            </table>
          </div>
       </div>
  </div>
    </section>
         </body>
       </html>
       `;
       res.send(template);
});
});
  
  module.exports = router;

