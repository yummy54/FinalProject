const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
// express 패키지의 Router를 가져온다.

var SeoulMapSchema = mongoose.Schema({
    name:String, // 이름
    gu:String, // 구
    dong:String, // 주소
    detail:String,  // 상세주소
    latitude:String, // 위도
    longitude:String // 경도
  },
    {
      collection : 'seoulmap'
  });


var SeoulParkingMapSchema = mongoose.Schema({
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
  latitude:String, // 위도
  longitude:String // 경도
},
  {
    collection : 'seoulparkingmap'
});

var SearchSchema = mongoose.Schema({
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
  latitude:String, // 위도
  longitude:String, // 경도
  code:String       // 주차장, 단속구간 구분
},
  {
    collection : 'search'
  
})

var SeoulMap = mongoose.model('SeoulMap', SeoulMapSchema);
var SeoulParkingMap = mongoose.model('SeoulParkingMap', SeoulParkingMapSchema);
var Search = mongoose.model('Search', SearchSchema);


router.get('/', function(req, res, next){
  var dong = req.query.dong;
  Search.find({'dong' : dong},{_id : 0},function(err,docs){

      if(err) console.log('err');
      console.log(docs.length);
      console.log(dong);

     var template = `
     <!doctype html>
      <html>
      <head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""
  />
  <!-- Make sure you put this AFTER Leaflet's CSS -->
  <script
    src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""
  ></script>
  <style>
    #mapid {
      height: 600px;
      width: 600px;
    }
  </style>
</head>
<body>
  <div id="mapid"></div>
  <script>
    var mymap = L.map('mapid', {
      center: [37.541, 126.986],
      zoom: 13
    });
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVlc2V1bmdzb28iLCJhIjoiY2wxbHJmcXlkMGNoejNkcXVyeHI2dmUwOCJ9.t5zcX0VGgTFsu9rFNsxYuw",
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoibGVlc2V1bmdzb28iLCJhIjoiY2wxbHJmcXlkMGNoejNkcXVyeHI2dmUwOCJ9.t5zcX0VGgTFsu9rFNsxYuw",
      }
    ).addTo(mymap);
    var greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    var marker = L.marker([37.50420793, 127.010337], {icon: greenIcon}).addTo(mymap);`

    /*for(var i=0;i<docs.length;i++){
     template += `marker.addLayer(L.marker([${docs[i][37.4825829]}, ${docs[i][126.982344]}])
      .bindPopup("이름 : ${docs[i]['name']}"));`
     }*/
    
   
     template+=`
  </script>
 </body>
 </html>
`;
 res.send(template);
   
})
});

  module.exports = router;