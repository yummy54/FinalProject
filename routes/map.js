const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
// express 패키지의 Router를 가져온다.

var SeoulParkingmapSchema = mongoose.Schema({
    name:String, // 이름
    address:String, // 구
    dong:String, // 주소
    num:String, //
    opday:String,
    wds:String,
    wde:String,
    hds:String,
    hde:String,
    bpt:String,
    bpf:String,
    latitude:String, // 위도
    longitude:String, // 경도
    code:String
  },
    {
      collection : 'koreaparkinglot'
  });

var KoreaParkinglot = mongoose.model('finalproject', SeoulParkingmapSchema)

router.get('/maptest', function(req, res, next){
  KoreaParkinglot.find({},{_id : 0},function(err,docs){
      if(err) console.log('err');
      var template = `
      <!doctype html>
      <html>
      <head>
        <title>Result</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin="" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css" />
        <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==" crossorigin=""></script>
        <script src="https://unpkg.com/leaflet.markercluster@1.3.0/dist/leaflet.markercluster.js"></script>
        <link rel="stylesheet" href="/stylesheets/leaflet.css" >
      </head>
      <body>
       <div id="map"></div>
       <script style ="visibility:none">
         <!-- Leaflet 지도 불러오기(link rel, script src 태그들 관련 unpkg뭐시기로 시작하는거 = Leaflet를 실행하게 하는 코드) --!>
         const map = L.map('map').setView([37.4895246, 126.986331], 14);
         const attribution =
         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
         const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
         const tiles = L.tileLayer(tileUrl,{attribution})
         tiles.addTo(map);
         <!-- 여기 밑에서부터는 마커클러스터 구현 코드 --!>
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
          <!-- 지도 내 현재위치 구현 코드 --!>
          map.locate({enableHightAccuracy: true});
          map.on('locationfound', e => {
              const coords = [e.latlng.lat, e.latlng.lng];
              const marker = L.marker(coords);
              marker.bindPopup('당신이 현재있는 위치입니다.');
              map.addLayer(marker);
              var circle = L.circle([e.latlng.lat, e.latlng.lng], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(map);
              console.log(coords);
          });
       </script>
      </body>
      </html>
     `;
      res.end(template);
    })
});

router.get('/maptest2', function(req, res, next){
    var address = req.query.address;
    KoreaParkinglot.find({'address' : address},{_id : 0},function(err,docs){
        if(err) console.log('err');
        console.log(docs.length);
        console.log(address);
        var template = `
        <!doctype html>
        <html>
        <head>
          <title>Result</title>
          <meta charset="utf-8">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin="" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css" />
          <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==" crossorigin=""></script>
          <script src="https://unpkg.com/leaflet.markercluster@1.3.0/dist/leaflet.markercluster.js"></script>
          <link rel="stylesheet" href="/stylesheets/leaflet.css" >
        </head>
        <body>
         <div id="map"></div>
         <script style ="visibility:none">
           const map = L.map('map').setView([37.27538, 127.05488], 7);
           const attribution =
           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
           const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
           const tiles = L.tileLayer(tileUrl,{attribution})
           tiles.addTo(map);
           <!-- 여기 밑에서부터는 마커클러스터 구현 코드 --!>
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
            console.log(markers);
         </script>
        </body>
        </html>
       `;
        res.end(template);

      })

});


module.exports = router;
