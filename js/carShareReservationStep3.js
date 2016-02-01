/**
 * Created by Yassine.
 **/


var selectedCar = "";

// function get available cars
function getAvailableCars(){
    selectedCar = "";
    var departure = window.localStorage.getItem("departure");
    var returning = window.localStorage.getItem("returning");
    var fromId = window.localStorage.getItem("fromId");
    var toId = window.localStorage.getItem("fromId");
    var apiKey = window.localStorage.getItem("apiKey");
    document.getElementById("listCars").style.display="block";
    document.getElementById("btnReserve").style.display="block";
    var dataReq = "from="+fromId+"&to="+toId+"&departure="+departure+"&returning="+returning+"&key="+apiKey;
    getAvailableCarsJson(dataReq);
}

// function get available cars API
function getAvailableCarsJson(dataReq) {
$.ajax
({
    url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/reservation/availableCars/jsonp?"+dataReq,
    type: "GET",
    jsonpCallback: 'jsonCallback',
    contentType: 'application/json',
    dataType: 'jsonp',
    async: false,
    success: function(data)
    {
        console.log(data);
        if(data.cars.length == 0){
            document.getElementById("availableCar").innerHTML = "No available car";
         }
        if(data.status==true) {
            for(i=0;i<data.cars.length;i++){
                var manufactor = data.cars[i].type.manufacturer;
                if(manufactor=="Bmw"){
                    document.getElementById("stateBmw").style.display="block";
                    document.getElementById("stateBmwText").style.display="none";
                    var params = "<b>Power : </b>"+data.cars[i].type.power+", <b>Battery Power : </b>"+data.cars[i].type.batteryPower+", <b>Autonomy : </b>"+data.cars[i].type.autonomy+", <b>Max Speed : </b>"+data.cars[i].type.maxSpeed+"+<br>";
                    document.getElementById("bmwSpes").innerHTML=params;
                }
                if(manufactor=="Peugeot"){
                    document.getElementById("statePeugeot").style.display="block";
                    document.getElementById("statePeugeotText").style.display="none";
                    var params = "<b>Power : </b>"+data.cars[i].type.power+", <b>Battery Power : </b>"+data.cars[i].type.batteryPower+", <b>Autonomy : </b>"+data.cars[i].type.autonomy+", <b>Max Speed : </b>"+data.cars[i].type.maxSpeed+"+<br>";
                    document.getElementById("peugeotSpes").innerHTML=params;
                }
                    
            }

        }
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
    }
    })
}

// Set the car name function
function setCar(carName){
    selectedCar = carName;
}

//function validate reservation
function reserve(){
    {
        document.getElementById("errorMessage").innerHTML="";
        var carId = 0;
        if(selectedCar == "bmwSelect"){
            carId = 1;
        }
        if(selectedCar == "peugeotSelect"){
            carId = 2;
        }
        var departure = window.localStorage.getItem("departure");
        var returning = window.localStorage.getItem("returning");
        var fromId = window.localStorage.getItem("fromId");
        var toId = window.localStorage.getItem("fromId");
        var apiKey = window.localStorage.getItem("apiKey");
        var dataReq = "departure="+departure+"&returning="+returning+"&fromId="+fromId+"&toId="+toId+"&carId="+carId+"&key="+apiKey;
        reserveJson(dataReq);
    }  
}

//function validate reservation API
function reserveJson(dataReq) {
    $.ajax
    ({
          url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/reservation/reserve/jsonp?"+dataReq,
          type: "GET",
          jsonpCallback: 'jsonCallback',
          contentType: 'application/json',
          dataType: 'jsonp',
          async: false,
          success: function(data)
          {
                    var departure = window.localStorage.removeItem("departure");
                    var returning = window.localStorage.removeItem("returning");
                    var fromId = window.localStorage.removeItem("fromId");
                    var toId = window.localStorage.removeItem("toId");
                    window.top.location="carShareReservationSuccess.html";
          },
          error: function (jqXHR, textStatus, errorThrown)
          {
          }
      })
  }