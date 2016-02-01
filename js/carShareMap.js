/**
 * Created by Yassine.
 **/


L.mapbox.accessToken = 'pk.eyJ1IjoieWtjaGlyIiwiYSI6IjQwM2U3MjMzZDk4ODY3NDBjYWJjYzAwZGM0MDI3YmVlIn0.MFM-yETlUutb9EEj3SkYjw';
var map = L.mapbox.map('map', 'mapbox.streets').setView([49.611, 6.07], 11);
var layerStation = L.layerGroup().addTo(map);
var layerCharge = L.layerGroup().addTo(map);
var layerLocation = L.layerGroup().addTo(map);

var stationBefore = true;
var chargeBefore = true;
var locationBefore = true;


function getCheck(){
    if($('#station').prop('checked') && !stationBefore){
        tabStations.map(function (layer) {
           map.addLayer(layer);
        });
        stationBefore = true;
    }
    if(!$('#station').prop('checked') && stationBefore){
        //layerStation.clearLayers();
        tabStations.map(function (layer) {
            map.removeLayer(layer);
        });
        stationBefore = false;
    }
    if($('#position').prop('checked') && !locationBefore){
        tabLocation.map(function (layer) {
           map.addLayer(layer);
        });
        locationBefore = true;
    }
    if(!$('#position').prop('checked') && locationBefore){
        tabLocation.map(function (layer) {
            map.removeLayer(layer);
        });
        locationBefore = false;
    }
    if($('#charge').prop('checked') && !chargeBefore){
        tabCharge.map(function (layer) {
            map.addLayer(layer);
        });
        chargeBefore = true;
    }
    if(!$('#charge').prop('checked') && chargeBefore){
        tabCharge.map(function (layer) {
            map.removeLayer(layer);
        });
        chargeBefore = false;
    }
}

var tabCharge = [];
//// Get openchargemap DATA
function showData() {
    $.ajax
    ({
          url: "http://api.openchargemap.io/v2/poi/?output=json&countrycode=LU&maxresults=100",
          type: "GET",
          jsonpCallback: 'jsonCallback',
          contentType: 'application/json',
          dataType: 'jsonp',
          async: false,
          success: function(data)
          {
              for(i=0;i<data.length;i++){
                  var usageType;
                  if(data[i].UsageType == null) {usageType = "(Unkown)";}
                  else {
                      usageType = data[i].UsageType.Title;
                  }
                L.mapbox.featureLayer({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [
                      data[i].AddressInfo.Longitude,
                      data[i].AddressInfo.Latitude 
                    ]
                },
                properties: {
                    title: data[i].AddressInfo.Title,
                    description: "<b>Address : </b>"+data[i].AddressInfo.AddressLine1+", "+data[i].AddressInfo.Town+", "+data[i].AddressInfo.Postcode+", "+data[i].AddressInfo.Country.Title+".<br><b>Status : </b>"+data[i].StatusType.Title+".<br><b>Usage : </b>"+usageType,
                    'marker-size': 'medium',
                    'marker-color': '#2196F3',
                    'marker-symbol': 'fuel'
                    }
                }).addTo(layerCharge);
                tabCharge.push(layerCharge);
              }
          },
          error: function (jqXHR, textStatus, errorThrown)
          {
          }
      })
  }

var tabStations = [];
//// Get station from the server
function showStations() {
    $.ajax
    ({
          url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/station/findAll/jsonp?",
          type: "GET",
          jsonpCallback: 'jsonCallback',
          contentType: 'application/json',
          dataType: 'jsonp',
          async: false,
          success: function(data)
          {
              for(i=0;i<data.stations.length;i++){
                  L.mapbox.featureLayer({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [
                          data.stations[i].longitude,
                          data.stations[i].latitude 
                        ]
                    },
                    properties: {
                        title: data.stations[i].name,
                        'marker-size': 'large',
                        'marker-color': '#4CAF50',
                        'marker-symbol': 'car'
                        }
                    }).addTo(layerStation);

                  tabStations.push(layerStation);
              }
          },
          error: function (jqXHR, textStatus, errorThrown)
          {
          }
      })
  }


var tabLocation = [];
/// Get user position
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    }
}
//// Add user position to the map
function showPosition(position) {
    L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
              position.coords.longitude,
              position.coords.latitude
            ]
        },
        properties: {
            title: "My Position",
            'marker-size': 'large',
            'marker-color': '#f86767',
            'marker-symbol': 'circle'
            }
    }).addTo(layerLocation);
    tabLocation.push(layerLocation);
}