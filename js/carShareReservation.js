/**
 * Created by Yassine.
 **/


/////// summary parameters init
$(startDate).change(function(){
document.getElementById("startDateSum").textContent = document.getElementById("startDate").value;
});
  $(endDate).change(function(){
document.getElementById("endDateSum").textContent = document.getElementById("endDate").value;
});
  $(startTime).change(function(){
document.getElementById("startTimeSum").textContent = document.getElementById("startTime").value;
});
  $(endTime).change(function(){
document.getElementById("endTimeSum").textContent = document.getElementById("endTime").value;
});
  $(startStation).change(function(){
document.getElementById("StartStationSum").textContent = document.getElementById("startStation").value;
document.getElementById("bmwI3").disabled=true;
});
  $(endStation).change(function(){
document.getElementById("endStationSum").textContent = document.getElementById("endStation").value;
});
//   $(carSelection).change(function(){
// document.getElementById("carSelectionSum").textContent = document.getElementById("carSelection").value;
// });
angular.module("mainModule", [])
  .controller("mainController", function ($scope)
  {

  });
////GET AVAILABLE FUNCTION//////
$(document).ready(function () {
   $("#step23").click(function () {
   window.localStorage.removeItem("resReq");
   var fromId = $("#startStation").val();
   var toId = $("#endStation").val();
   var departure = $("#startDate").val()+" "+$("#startTime").val();
   var startTime = $("#startTime").val();
   var returning = $("#endDate").val()+" "+$("#endTime").val();
   var endTime = $("#endTime").val();
   var departureForm = new Date(departure);
   var depMonth = departureForm.getMonth()+1;
   var depDay = departureForm.getDate();
   if (depMonth < 10) {
     depMonth = "0"+depMonth;
   }
   if (depDay < 10) {
     depDay = "0"+depDay;
   }
   var depFinal = depMonth+"/"+depDay+"/"+departureForm.getFullYear()+" "+startTime;
   var returningForm = new Date(returning);
   var depMonthRet = returningForm.getMonth()+1;
   var depDayRet = returningForm.getDate();
   if (depMonthRet < 10) {
     depMonthRet = "0"+depMonthRet;
   }
   if (depDayRet < 10) {
     depDayRet = "0"+depDayRet;
   }
   var retFinal = depMonthRet+"/"+depDayRet+"/"+returningForm.getFullYear()+" "+endTime;
   var key = window.localStorage.getItem("apiKey");
   var dataReq = "from="+fromId+"&to="+toId+"&departure="+depFinal+"&returning="+retFinal+"&key="+key;
   var dataReq2 = "fromId="+fromId+"&toId="+toId+"&departure="+depFinal+"&returning="+retFinal+"&key="+key;
   window.localStorage.setItem("resReq", dataReq2);
   window.localStorage.removeItem("bmw");
   window.localStorage.removeItem("peugeot");
   window.localStorage.removeItem("renault");
   window.localStorage.removeItem("nissan");
   window.localStorage.removeItem("volkswagen");
   window.localStorage.removeItem("citroen");
   authenticate(dataReq);
});
});
$(document).ready(function () {
   $("#step23bis").click(function () {
     window.localStorage.removeItem("resReq");
     var fromId = $("#startStation").val();
     var toId = $("#endStation").val();
     var departure = $("#startDate").val()+" "+$("#startTime").val();
     var startTime = $("#startTime").val();
     var returning = $("#endDate").val()+" "+$("#endTime").val();
     var endTime = $("#endTime").val();
     var departureForm = new Date(departure);
     var depMonth = departureForm.getMonth()+1;
     var depDay = departureForm.getDate();
     if (depMonth < 10) {
       depMonth = "0"+depMonth;
     }
     if (depDay < 10) {
       depDay = "0"+depDay;
     }
     var depFinal = depMonth+"/"+depDay+"/"+departureForm.getFullYear()+" "+startTime;
     var returningForm = new Date(returning);
     var depMonthRet = returningForm.getMonth()+1;
     var depDayRet = returningForm.getDate();
     if (depMonthRet < 10) {
       depMonthRet = "0"+depMonthRet;
     }
     if (depDayRet < 10) {
       depDayRet = "0"+depDayRet;
     }
     var retFinal = depMonthRet+"/"+depDayRet+"/"+returningForm.getFullYear()+" "+endTime;
     var key = window.localStorage.getItem("apiKey");
     var dataReq = "from="+fromId+"&to="+toId+"&departure="+depFinal+"&returning="+retFinal+"&key="+key;
     var dataReq2 = "fromId="+fromId+"&toId="+toId+"&departure="+depFinal+"&returning="+retFinal+"&key="+key;
     window.localStorage.setItem("resReq", dataReq2);
     window.localStorage.removeItem("bmw");
     window.localStorage.removeItem("peugeot");
     window.localStorage.removeItem("renault");
     window.localStorage.removeItem("nissan");
     window.localStorage.removeItem("volkswagen");
     window.localStorage.removeItem("citroen");
     authenticate(dataReq);
});
});
function authenticate(dataReq) {
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

      window.localStorage.setItem("bmw", "");
      window.localStorage.setItem("peugeot", "");
      window.localStorage.setItem("renault", "");
      window.localStorage.setItem("nissan", "");
      window.localStorage.setItem("volkswagen", "");
      window.localStorage.setItem("citroen", "");
        if(data.status==true) {
            for(i=0;i<data.cars.length;i++){
                var manufactor = data.cars[i].type.manufacturer;
                window.localStorage.setItem(manufactor, true);
            }

        }
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
    }
    })
}

/////// Reservation function
$(document).ready(function () {
    $("#reserve").click(function () {
    var fromId = $("#startStation").val();
    var toId = $("#endStation").val();
    var departure = $("#startDate").val()+" "+$("#startTime").val();
    var startTime = $("#startTime").val();
    var returning = $("#endDate").val()+" "+$("#endTime").val();
    var endTime = $("#endTime").val();
    var carName = $("#carSelection").val();
        var carId;
        if(carName=="bwmI3"){carId = "1";}
        if(carName=="peugeotIon"){carId = "2";}
    var departureForm = new Date(departure);
    var depFinal = "0"+departureForm.getMonth()+"/0"+departureForm.getDay()+"/"+departureForm.getFullYear()+" "+startTime;
    var returningForm = new Date(returning);
    var retFinal = "0"+returningForm.getMonth()+"/0"+returningForm.getDay()+"/"+returningForm.getFullYear()+" "+endTime;
    var key = window.localStorage.getItem("apiKey");
    var dataReq = "fromId="+fromId+"&toId="+toId+"&departure="+depFinal+"&returning="+retFinal+"&key="+key+"&carId="+carId;
    document.getElementById("reservationTitle").innerHTML = "Reservation Failure";
    document.getElementById("reservationMessage").innerHTML = "Please verify your parameters";
    document.getElementById("reserveBtn").innerHTML = "Retry";
    document.getElementById("reserveBtn").href = "#";
    reserve(dataReq);
});
});
function reserve(dataReq) {
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
        if(data.status==true) {
            document.getElementById("reservationTitle").innerHTML = "Reservation Success";
            document.getElementById("reservationMessage").innerHTML = "Your reservation is saved";
            document.getElementById("reserveBtn").innerHTML = "Ok";
            document.getElementById("reserveBtn").onclick = function(){ location="map.html"; }
        }
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
    }
    })
}

$(document).ready(function () {
    $("#reserve").click(function () {
    var fromId = $("#startStation").val();
    var toId = $("#endStation").val();
    var departure = $("#startDate").val()+" "+$("#startTime").val();
    var startTime = $("#startTime").val();
    var returning = $("#endDate").val()+" "+$("#endTime").val();
    var endTime = $("#endTime").val();
    var carName = $("#carSelection").val();
        var carId;
        if(carName=="bwmI3"){carId = "1";}
        if(carName=="peugeotIon"){carId = "2";}
    var departureForm = new Date(departure);
    var depFinal = "0"+departureForm.getMonth()+"/0"+departureForm.getDay()+"/"+departureForm.getFullYear()+" "+startTime;
    var returningForm = new Date(returning);
    var retFinal = "0"+returningForm.getMonth()+"/0"+returningForm.getDay()+"/"+returningForm.getFullYear()+" "+endTime;
    var key = window.localStorage.getItem("apiKey");
    var dataReq = "fromId="+fromId+"&toId="+toId+"&departure="+depFinal+"&returning="+retFinal+"&key="+key+"&carId="+carId;
    document.getElementById("reservationTitle").innerHTML = "Reservation Failure";
    document.getElementById("reservationMessage").innerHTML = "Please verify your parameters";
    document.getElementById("reserveBtn").innerHTML = "Retry";
    document.getElementById("reserveBtn").href = "#";
    reserve(dataReq);
});
});
////////////////// adjust date
function adjustDate(){
  sd = document.getElementById("startDate").value;
  st = document.getElementById("startTime").value;
  ed = document.getElementById("endDate").value;
  et = document.getElementById("endTime").value;
  dd0 = sd + " " +st;
  rd0 = ed + " " +et;
  var dd = new Date(dd0);
  var rd = new Date(rd0);
  var month = parseInt(dd.getMonth())+parseInt(1);
  var day = dd.getDate();
  var year = dd.getFullYear();
  var hour = dd.getHours();
  var hour2 = dd.getHours()+parseInt(1);
  var minute = dd.getMinutes()+15;
  // if (minute == 0) {
  //   minute = "15";
  // }
  // if (minute == 15) {
  //   minute = "30";
  // }
  // if (minute == 30) {
  //   minute = "45";
  // }
  // if (minute == 45) {
  //   minute = "00";
  //   hour = hour + 1;
  //   hour2 = hour2 + 1;
  //   if (hour > 23) {
  //     hour = "00";
  //     hour2 = "01";
  //     day = day + 1;
  //   }
  // }
  // if (minute>0 && minute<15) {
  //   minute="15";
  // }
  // if(minute>15 && minute<30){
  //   minute="30";
  // }
  // if (minute>30 && minute<45) {
  //   minute="45";
  // }
  // if (minute>45) {
  //   minute="00";
  //   hour = hour + 1;
  //   hour2 = hour2 + 1;
  // }
  // if(hour<10) {
  //     hour = "0" + hour;
  // }
  // if(hour2<10) {
  //     hour2 = "0" + hour2;
  // }
  // var df = (year+'-'+month+'-'+day);
  //
  // if (hour=="23"){hour2="00";}
  // if (hour=="24"){hour2="01";}
  //
  // var hf = (hour+':'+minute);
  // var hf2 = (hour2+':'+minute);
  //
  // document.getElementById("startDate").value=df;
  // document.getElementById("startTime").value=hf;
  // document.getElementById("endDate").value=df;
  // document.getElementById("endTime").value=hf2;
  // document.getElementById("startDateSum").textContent=df;
  // document.getElementById("endDateSum").textContent=hf;
  // document.getElementById("startTimeSum").textContent=df;
  // document.getElementById("endTimeSum").textContent=hf2;
}
