/**
 * Created by Yassine on 10/12/2015.
 */
function check(){
    if(window.localStorage.getItem("loggedIn") != 1) {
        // Not Logged In
        // Redirect to login page.
        location="../../index.html";
    }
    else{
        var firstName = window.localStorage.getItem("firstName");
        var lastName = window.localStorage.getItem("lastName");
        var email = window.localStorage.getItem("email");
        document.getElementById("userPar").innerHTML= firstName+" "+lastName;
        document.getElementById("userEmail").innerHTML= email;
    }
}
function testLoad()
{
    var     travelID = $_GET('travelID'),
        carName = $_GET('carName'),
        carModel = $_GET('carModel'),
        carColor = $_GET('carColor'),
        bagsAllowed = $_GET('bagsAllowed'),
        breakAllowed = $_GET('breakAllowed'),
        additionalOption = $_GET('additionalOption'),
        rideID = $_GET('rideID'),
        startDate = $_GET('startDate'),
        nbPlaces = $_GET('nbPlaces'),
        price = $_GET('price'),
        departureCity = $_GET('departureCity'),
        arrivalCity = $_GET('arrivalCity'),
        appointmentAddress = $_GET('appointmentAddress'),
        verifPlaces = $_GET('verifPlaces');
    document.getElementById("rideTitle").innerHTML =decodeURI(departureCity)+" <i class=\"zmdi zmdi-arrow-forward\"></i> "+decodeURI(arrivalCity);
    var dateP = new Date(parseInt(startDate));
    var dateForm = dateP.toDateString()+" "+ dateP.getHours()+":"+ dateP.getMinutes();
    document.getElementById("rideDate").innerHTML =dateForm;
    document.getElementById("appointmentAddress").innerHTML ="<b>Meeting Point : </b>"+decodeURI(appointmentAddress);
    document.getElementById("price").innerHTML ="<b>Price : </b>"+price+",00 \u20AC ";
    document.getElementById("carType").innerHTML ="<b>Car Model : </b>"+decodeURI(carName)+" "+decodeURI(carModel);
    document.getElementById("carColor").innerHTML ="<b>Car Color : </b>"+decodeURI(carColor);
    document.getElementById("nbPlaces").innerHTML ="<b>Number of free Places : </b>"+nbPlaces;
    var textAllowed="";
    if(breakAllowed == 1) {textAllowed+="<i class=\"zmdi zmdi-local-cafe\"></i>  ";}
    if(bagsAllowed == 1) {textAllowed+="   <i class=\"zmdi zmdi-local-mall\"></i>";}
    if(breakAllowed == 0) {textAllowed+="";}
    if(bagsAllowed == 0) {textAllowed+="";}
    document.getElementById("allowRide").innerHTML ="<b>Option : </b>"+textAllowed;
    document.getElementById("additionalOption").innerHTML ="<b>Additional Option  : </b>"+decodeURI(additionalOption);
    if(verifPlaces == "false"){
        document.getElementById("reserveButton").style.display= "none";
        document.getElementById("noReservation").innerHTML = "This travel is full";
    }
}
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

function reserve(){
    var requestData = "key="+window.localStorage.getItem("apiKey")+"&travelId="+$_GET('travelID')+"&rideId="+$_GET('rideID')+"&arrivalCity="+decodeURI($_GET('arrivalCity'))+"&arrivalRank="+$_GET('arrivalRank');
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/travel/reserve/jsonp?"+requestData,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data)
        {
            window.top.location = "carPoolReservationSuccess.html";
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}