L.mapbox.accessToken = 'pk.eyJ1IjoieWtjaGlyIiwiYSI6IjQwM2U3MjMzZDk4ODY3NDBjYWJjYzAwZGM0MDI3YmVlIn0.MFM-yETlUutb9EEj3SkYjw';
var map = L.mapbox.map('map', 'mapbox.streets').setView([49.611, 6.07], 9);


function stepValidation() {
   var fromId = $("#startStation").val();
   var toId = $("#endStation").val();
    if(fromId == "--"){
        document.getElementById("errorMessage").innerHTML = "Please select a departure station";
    }
    else if(toId == "--"){
        document.getElementById("errorMessage").innerHTML = "Please select a returning station";
    }
    else{
        console.log(fromId);
        console.log(toId);
        window.localStorage.setItem("fromId", fromId);
        window.localStorage.setItem("toId", toId);
        window.localStorage.setItem("iReload",0);
        window.top.location="carShareReservationStep3Frame.html";
    }
}


//// Get station from the server
function addStations() {
    map.invalidateSize();
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
                  var optionDep = document.createElement("option");
                  optionDep.value = data.stations[i].id;
                  optionDep.innerHTML = data.stations[i].name;
                  
                  var optionRet = document.createElement("option");
                  optionRet.value = data.stations[i].id;
                  optionRet.innerHTML = data.stations[i].name;
                  
                  document.getElementById("startStation").appendChild(optionDep);
                  document.getElementById("endStation").appendChild(optionRet);
                  
              }
          },
          error: function (jqXHR, textStatus, errorThrown)
          {
              console.log(jqXHR);
          }
      })
  }

function showStation(id){
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
                 if(data.stations[i].id == id){
                     map.setView([data.stations[i].latitude, data.stations[i].longitude], 13);
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
                        'marker-size': 'medium',
                        'marker-color': '#4CAF50',
                        'marker-symbol': 'car'
                        }
                    }).addTo(map);
                 }   
              }
          },
          error: function (jqXHR, textStatus, errorThrown)
          {
              console.log(jqXHR);
          }
      })
}