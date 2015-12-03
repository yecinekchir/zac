/**
 * Created by Yassine on 02/12/2015.
 */
var rideCmpt = 0;
function initialize() {
    var options = {
        types: ['(regions)']
    };
    var input = document.getElementById('departureTravel');
    var input2 = document.getElementById('departureRide1');
    var input3 = document.getElementById('departureRide2');
    var input4 = document.getElementById('departureRide3');
    var input5 = document.getElementById('departureRide4');
    var input6 = document.getElementById('departureRide5');
    var input7 = document.getElementById('arrivalTravel');
    var autocomplete = new google.maps.places.Autocomplete(input , options);
    var autocomplete = new google.maps.places.Autocomplete(input2 , options);
    var autocomplete = new google.maps.places.Autocomplete(input3 , options);
    var autocomplete = new google.maps.places.Autocomplete(input4 , options);
    var autocomplete = new google.maps.places.Autocomplete(input5 , options);
    var autocomplete = new google.maps.places.Autocomplete(input6 , options);
    var autocomplete = new google.maps.places.Autocomplete(input7 , options);
}
google.maps.event.addDomListener(window, 'load', initialize);

function verifContent(content){
    if(content == ""){
        return false;
    }
    else return true;
}

function nextStep(){
    var dateTravel = document.getElementById("dateTravel").value;
    var departureTravel = document.getElementById("departureTravel").value;
    var timeTravel = document.getElementById("timeTravel").value;
    var appointmentTravel = document.getElementById("appointmentTravel").value;
    var arrivalTravel = document.getElementById("arrivalTravel").value;
    var arrivalTravelTime = document.getElementById("arrivalTravelTime").value;
    if(!verifContent(dateTravel)){
        document.getElementById("errorMessage").innerHTML = "Please Verify The travel date";
        return;
    }
    if(!verifContent(departureTravel)){
        document.getElementById("errorMessage").innerHTML = "Please Verify The travel departure";
        return;
    }
    if(!verifContent(timeTravel)){
        document.getElementById("errorMessage").innerHTML = "Please Verify The travel time";
        return;
    }
    if(!verifContent(appointmentTravel)){
        document.getElementById("errorMessage").innerHTML = "Please Verify The travel appointment address";
        return;
    }
    if(!verifContent(arrivalTravel)){
        document.getElementById("errorMessage").innerHTML = "Please Verify The travel arrival address";
        return;
    }
    if(!verifContent(arrivalTravelTime)){
        document.getElementById("errorMessage").innerHTML = "Please Verify The travel arrival time";
        return;
    }
    if(rideCmpt>0){
        for(i=0;i<rideCmpt;i++){
            var departureRideField = "departureRide"+(i+1);
            var timeRideField = "timeRide"+(i+1);
            var appointmentRideField = "appointmentRide"+(i+1);
            var departureRide = document.getElementById(departureRideField).value;
            var timeRide = document.getElementById(timeRideField).value;
            var appointmentRide = document.getElementById(appointmentRideField).value;
            if(!verifContent(departureRide)){
                document.getElementById("errorMessage").innerHTML = "Please Verify The Ride "+(i+1)+" departure";
                return;
            }
            if(!verifContent(timeRide)){
                document.getElementById("errorMessage").innerHTML = "Please Verify The Ride "+(i+1)+" time";
                return;
            }
            if(!verifContent(appointmentRide)){
                document.getElementById("errorMessage").innerHTML = "Please Verify The Ride "+(i+1)+" appointment address";
                return;
            }
            window.localStorage.setItem(departureRideField, departureRide);
            window.localStorage.setItem(timeRideField, timeRide);
            window.localStorage.setItem(appointmentRideField, appointmentRide);
        }
    }
    document.getElementById("errorMessage").innerHTML = "";
    window.localStorage.setItem("rideCmpt", rideCmpt);
    window.localStorage.setItem("dateTravel", dateTravel);
    window.localStorage.setItem("departureTravel", departureTravel);
    window.localStorage.setItem("timeTravel", timeTravel);
    window.localStorage.setItem("appointmentTravel", appointmentTravel);
    window.localStorage.setItem("arrivalTravel", arrivalTravel);
    window.localStorage.setItem("arrivalTravelTime", arrivalTravelTime);
    window.top.location="carPoolSuggestStep2.html";
}
function setDate() {
    var currentTime = new Date();
    var month = parseInt(currentTime.getMonth())+parseInt(1);
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    if(month<10) {
        month = "0" + month;
    }
    if(day<10) {
        day = "0" + day;
    }
    if(hour<10) {
        hour = "0" + hour;
    }
    if(minute<10) {
        minute="0" + minute;
    }
    var dt = (year+'-'+month+'-'+day);
    var hm = (hour+':'+minute);

    hour2 = parseInt(hour)+parseInt(1);

    document.getElementById("dateTravel").value=dt;
    document.getElementById("timeTravel").value=hm;
    document.getElementById("arrivalTravelTime").value=hour2+":"+minute;
}

angular.module("mainModule", [])
    .controller("mainController", function ($scope)
    {

    });

function addRide(){
    if(rideCmpt == 0){
        document.getElementById("ride1").style.display="block";
        document.getElementById("deleteRide").style.display="inline";
        rideCmpt++;
        return;
    }
    if(rideCmpt == 1){
        document.getElementById("ride2").style.display="inline";
        rideCmpt++;
        return;
    }
    if(rideCmpt == 2){
        document.getElementById("ride3").style.display="inline";
        rideCmpt++;
        return;
    }
    if(rideCmpt == 3){
        document.getElementById("ride4").style.display="inline";
        rideCmpt++;
        return;
    }
    if(rideCmpt == 4){
        document.getElementById("ride5").style.display="inline";
        rideCmpt++;
        return;
    }
    if(rideCmpt == 5){
        document.getElementById("addRide").style.display="none";
        return;
    }
}


function deleteRide(){
    if(rideCmpt == 1){
        document.getElementById("ride1").style.display="none";
        document.getElementById("deleteRide").style.display="none";
        rideCmpt--;
        return;
    }
    if(rideCmpt == 2){
        document.getElementById("ride2").style.display="none";
        rideCmpt--;
        return;
    }
    if(rideCmpt == 3){
        document.getElementById("ride3").style.display="none";
        rideCmpt--;
        return;
    }
    if(rideCmpt == 4){
        document.getElementById("ride4").style.display="none";
        rideCmpt--;
        return;
    }
    if(rideCmpt == 5){
        document.getElementById("ride5").style.display="none";
        document.getElementById("addRide").style.display="inline";
        rideCmpt--;
        return;
    }

}
function geolocate(timezone, cityPrecision, objectVar) {
    var api = (cityPrecision) ? "ip-city" : "ip-country";
    var domain = 'api.ipinfodb.com';
    var url = "http://" + domain + "/v3/" + api + "/?key=20b96dca8b9a5d37b0355e9461c66e76eed30a2274422fa6213d9de6ffb2b34e&format=json" + "&callback=" + objectVar + ".setGeoCookie";
    var geodata;
    var callbackFunc;
    var JSON = JSON || {};

    // implement JSON.stringify serialization
    JSON.stringify = JSON.stringify || function (obj) {
            var t = typeof (obj);
            if (t != "object" || obj === null) {
                // simple data type
                if (t == "string") obj = '"'+obj+'"';
                return String(obj);
            } else {
                // recurse array or object
                var n, v, json = [], arr = (obj && obj.constructor == Array);
                for (n in obj) {
                    v = obj[n]; t = typeof(v);
                    if (t == "string") v = '"'+v+'"';
                    else if (t == "object" && v !== null) v = JSON.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
            }
        };

    // implement JSON.parse de-serialization
    JSON.parse = JSON.parse || function (str) {
            if (str === "") str = '""';
            eval("var p=" + str + ";");
            return p;
        };

    //Check if cookie already exist. If not, query IPInfoDB
    this.checkcookie = function(callback) {
        geolocationCookie = getCookie('geolocation');
        callbackFunc = callback;
        if (!geolocationCookie) {
            getGeolocation();
        } else {
            geodata = JSON.parse(geolocationCookie);
            callbackFunc();
        }
    }

    //API callback function that sets the cookie with the serialized JSON answer
    this.setGeoCookie = function(answer) {
        if (answer['statusCode'] == 'OK') {
            JSONString = JSON.stringify(answer);
            setCookie('geolocation', JSONString, 365);
            geodata = answer;
            callbackFunc();
        }
    }

    //Return a geolocation field
    this.getField = function(field) {
        try {
            return geodata[field];
        } catch(err) {}
    }

    //Request to IPInfoDB
    function getGeolocation() {
        try {
            script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        } catch(err) {}
    }

    //Set the cookie
    function setCookie(c_name, value, expire) {
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expire);
        document.cookie = c_name+ "=" +escape(value) + ((expire==null) ? "" : ";expires="+exdate.toGMTString());
    }

    //Get the cookie content
    function getCookie(c_name) {
        if (document.cookie.length > 0 ) {
            c_start=document.cookie.indexOf(c_name + "=");
            if (c_start != -1){
                c_start=c_start + c_name.length+1;
                c_end=document.cookie.indexOf(";",c_start);
                if (c_end == -1) {
                    c_end=document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
        return '';
    }
}

//function geolocate(timezone, cityPrecision, objectVar).
//If you rename your object name, you must rename 'visitorGeolocation' in the function
var visitorGeolocation = new geolocate(false, true, 'visitorGeolocation');

//Check for cookie and run a callback function to execute after geolocation is read either from cookie or IPInfoDB API
var callback = function(){
    document.getElementById("departureTravel").value = visitorGeolocation.getField('countryName')+", "+visitorGeolocation.getField('cityName');
};
visitorGeolocation.checkcookie(callback);
