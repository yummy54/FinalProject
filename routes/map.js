const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
// express 패키지의 Router를 가져온다.

var KoreaParkinglotSchema = mongoose.Schema({
    name:String, // 이름
    gu:String, // 구
    dong:String, // 주소
    detail:String,  // 상세주소
    latitude:String, // 위도
    longitude:String, // 경도
    code:String
  },
    {
      collection : 'koreaparkinglot'
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

var KoreaParkinglot = mongoose.model('KoreaParkinglot', KoreaParkinglotSchema);
var SeoulParkingMap = mongoose.model('SeoulParkingMap', SeoulParkingMapSchema);
var Search = mongoose.model('Search', SearchSchema);


router.get('/maptest2', function(req, res, next){
  var dong = req.query.dong;
  KoreaParkinglot.find({'dong' : dong},{_id : 0},function(err,docs){
      if(err) console.log('err');
      console.log(docs.length);
      console.log(dong);
      var template = `
      <!doctype html>
      <html>
      <head>
        <title>Result</title>
        <meta charset="utf-8">
        <!-- link rel, script src 태그들 관련 unpkg뭐시기로 시작하는거 = Leaflet를 실행하게 하는 코드-->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin="" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css" />
        <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==" crossorigin=""></script>
        <script src="https://unpkg.com/leaflet.markercluster@1.3.0/dist/leaflet.markercluster.js"></script>
        <style>
        body {
          margin : 0;
          padding : 0;
        }
      
        #map {
          width : 100%;
          height : 100vh;
        }
        </style>
      </head>
      <body>
       <div id="map"></div>
       <script style ="visibility:none">
         // 여기 밑에부터는 맵 초기좌표, 맵 스타일을 불러오는 태그(copy 관련은 저작권 코드임.)
         const map = L.map('map').setView([37.27538, 127.05488], 7);
         const attribution =
         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
         const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
         const tiles = L.tileLayer(tileUrl,{attribution})
         tiles.addTo(map);
         // 여기 밑에부터는 마커 클러스터 기능구현 코드
         var markers = new L.MarkerClusterGroup();
         var greenIcon = new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        var redIcon = new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        
        
         `
      
         for(var i=0;i<docs.length;i++){
          if(docs[i]['latitude'] > 0 && docs[i]['longitude'] > 0 && docs[i]['code'] == 1){
            template += `markers.addLayer(L.marker([${docs[i]['latitude']}, ${docs[i]['longitude']}], {icon: greenIcon})
            .bindPopup("이름 : ${docs[i]['name']}"));`
          }
          if(docs[i]['latitude'] > 0 && docs[i]['longitude'] > 0 && docs[i]['code'] == 2){
          template += `markers.addLayer(L.marker([${docs[i]['latitude']}, ${docs[i]['longitude']}], {icon: redIcon})
           .bindPopup("이름 : ${docs[i]['name']}"));`
          }

          
         }

          template+=`
          map.addLayer(markers);
       </script>
      </body>
      </html>
     `;
      res.end(template);
      
    })

});

  module.exports = router;