/**
 * Created by Yassine.
 **/


L.mapbox.accessToken = 'pk.eyJ1IjoieWtjaGlyIiwiYSI6IjQwM2U3MjMzZDk4ODY3NDBjYWJjYzAwZGM0MDI3YmVlIn0.MFM-yETlUutb9EEj3SkYjw';
var map = L.mapbox.map('map', 'mapbox.streets').setView([49.611, 6.07], 9);
var stationsArray = new Array();

//get url param
function $_GET(param) {
    var vars = {};
    window.location.href.replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

// validate step reservation step 2
function stepValidation() {
    var departure = $_GET('departure');
    var returning = $_GET('returning');
   var fromId = $("#startStation").val();
   var toId = $("#endStation").val();
    if(fromId == "--"){
        document.getElementById("errorMessage").innerHTML = "Please select a departure station";
    }
    else if(toId == "--"){
        document.getElementById("errorMessage").innerHTML = "Please select a returning station";
    }
    else{
        window.localStorage.setItem("departure",departure);
        window.localStorage.setItem("returning",returning);
        window.localStorage.setItem("fromId",fromId);
        window.localStorage.setItem("toId",toId);
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
                  stationsArray[i]=data.stations[i];
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
          }
      })
  }


// add stations layers to mapbox
function showStation(id){
    map.setView([stationsArray[id-1].latitude, stationsArray[id-1].longitude], 15);
    L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
                stationsArray[id-1].longitude,
                stationsArray[id-1].latitude
            ]
        },
        properties: {
            title: stationsArray[id-1].name,
            'marker-size': 'medium',
            'marker-color': '#4CAF50',
            'marker-symbol': 'car'
        }
    }).addTo(map);
}