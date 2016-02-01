/**
 * Created by Yassine.
 **/

//initialisation
function check(){
    if(window.localStorage.getItem("loggedIn") != 1) {
        // Not Logged In
        // Redirect to login page.
        location="index.html"
    }
    else{
        var firstName = window.localStorage.getItem("firstName");
        var lastName = window.localStorage.getItem("lastName");
        var email = window.localStorage.getItem("email");
        document.getElementById("userPar").innerHTML= firstName+" "+lastName;
        document.getElementById("userEmail").innerHTML= email;
    }
}
// function previous page
function back(){window.top.location="carPoolSuggest.html"}

// get car manufacturer api
function showData() {
    $.ajax
    ({
        url: "https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=47e5hhbjtv54packznq45suc",
        type: "GET",
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        success: function(data)
        {
            for(i=0;i<data.makes.length;i++){
                var carManufactor = document.createElement("option");
                carManufactor.value = data.makes[i].niceName;
                carManufactor.className = "manf";
                carManufactor.innerHTML = data.makes[i].name;
                document.getElementById("carManufactor").appendChild(carManufactor);
            }

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}
// get car model api
function modelLoad() {
    var manufactor = document.getElementById("carManufactor").value;
    if(manufactor == "unkown") {
        return;
    }
    $('.models').remove();
    $.ajax
    ({
        url: "https://api.edmunds.com/api/vehicle/v2/"+manufactor+"?fmt=json&api_key=47e5hhbjtv54packznq45suc",
        type: "GET",
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        success: function(data)
        {
            for(i=0;i<data.models.length;i++){
                var carModel = document.createElement("option");
                carModel.value = data.models[i].name;
                carModel.innerHTML = data.models[i].name;
                carModel.className = "models";
                document.getElementById("carModel").appendChild(carModel);
            }

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}

//form verification
function verifContent(content){
    if(content == ""){
        return false;
    }
    else return true;
}

    var travelId = 1;

//function validate reservation
    function validate(){
    var carManufactor = document.getElementById("carManufactor").value;
    var carModel = document.getElementById("carModel").value;
    var carColor = document.getElementById("carColor").value;
    var nbrePlaces = document.getElementById("nbrePlaces").value;
    var price = document.getElementById("price").value;
    var addOpt = document.getElementById("addOpt").value;
    var bagsOpt = $('#bags').prop('checked');
    var breakOpt = $('#break').prop('checked');
    if(!verifContent(carManufactor)||carManufactor=="unkown"){
        document.getElementById("errorMessage").innerHTML = "Please select a car";
        return;
    }
    if(!verifContent(carModel)){
        document.getElementById("errorMessage").innerHTML = "Please select a car model";
        return;
    }
    if(!verifContent(carColor)){
        carColor = "unkown";
    }
    if(!verifContent(nbrePlaces)){
        document.getElementById("errorMessage").innerHTML = "Please select number of places";
        return;
    }
    if(!verifContent(price)){
        document.getElementById("errorMessage").innerHTML = "Please select the price";
        return;
    }
    document.getElementById("errorMessage").innerHTML = "";
    var apiKey = window.localStorage.getItem("apiKey");
    var rideCmpt = window.localStorage.getItem("rideCmpt");
    var dateTravel = window.localStorage.getItem("dateTravel");
    var departureTravel = window.localStorage.getItem("departureTravel");
    var timeTravel = window.localStorage.getItem("timeTravel");
    var appointmentTravel = window.localStorage.getItem("appointmentTravel");
    var arrivalTravel = window.localStorage.getItem("arrivalTravel");
    var arrivalTravelTime = window.localStorage.getItem("arrivalTravelTime");
    var departureDate = timeParse(dateTravel,timeTravel);
    var arrivalDate = timeParse(dateTravel,arrivalTravelTime);
    var departureRide = new Array();
    var timeRide = new Array();
    var appointmentRide = new Array();
    if(rideCmpt>0){
            for(i=0;i<rideCmpt;i++){
                var departureRideField = "departureRide"+(i+1);
                var timeRideField = "timeRide"+(i+1);
                var appointmentRideField = "appointmentRide"+(i+1);
                departureRide[i] = window.localStorage.getItem(departureRideField);
                timeRide[i] = window.localStorage.getItem(timeRideField);
                appointmentRide[i] = window.localStorage.getItem(appointmentRideField);
            }
    }
    document.getElementById("loading").style.display = "block";
    createTravel(apiKey,carManufactor,carModel,carColor,bagsOpt,breakOpt,addOpt).done(function(){
        // function1 is done, we can now call function2
        function2().done(function(){
            //function2 is done
            if(rideCmpt == 0){
                createRide(apiKey,travelId,departureTravel,departureDate,arrivalTravel,arrivalDate,nbrePlaces,price,appointmentTravel,0);
            }
            else {
                var firstRideArrivalDate = timeParse(dateTravel,timeRide[0]);
                createRide(apiKey,travelId,departureTravel,departureDate,departureRide[0],firstRideArrivalDate,nbrePlaces,price,appointmentTravel,0);
                for(i=0;i<rideCmpt;i++){
                    var rideDepartureDate = timeParse(dateTravel,timeRide[i]);
                    if(i == rideCmpt-1){
                        var rideDateEnd = arrivalDate;
                        var arrivalRide = arrivalTravel;
                    }
                    else {
                        var rideDateEnd = timeParse(dateTravel,timeRide[i+1]);
                        var arrivalRide = departureRide[i+1];
                    }
                    createRide(apiKey,travelId,departureRide[i],rideDepartureDate,arrivalRide,rideDateEnd,nbrePlaces,price,appointmentRide[i],i+1);
                }
            }
        });
    });
}


// function create travel
function createTravel(apiKey,carManufactor,carModel,carColor,bagsOpt,breakOpt,addOpt){
    var dfrd1 = $.Deferred();
    var dfrd2= $.Deferred();

    setTimeout(function(){
        var dataRequest = "key="+ apiKey +"&carName="+ carManufactor +"&carModel="+ carModel +"&carColor="+ carColor +"&bagsAllowed="+ bagsOpt +"&breakAllowed="+ breakOpt +"&additionalOption="+ addOpt;
        function1(dataRequest);
        dfrd1.resolve();
    }, 1000);

    setTimeout(function(){
        dfrd2.resolve();
    }, 750);

    return $.when(dfrd1, dfrd2).done(function(){
        // Both asyncs tasks are done
    }).promise();
}

///function create ride
function createRide(apiKey,travelId,departureTravel,departureDate,arrivalTravel,arrivalDate,nbrePlaces,price,appointmentTravel,rank){
    var departureCity = getCity(departureTravel);
    var departureCountry = getCountry(departureTravel);
    var arrivalCity = getCity(arrivalTravel);
    var arrivalCountry = getCountry(arrivalTravel);
    var dataRequest = "key="+ apiKey +"&travelId="+ travelId +"&departureCity="+ departureCity +"&departureCountry="+ departureCountry +"&departureDate="+ departureDate +"&arrivalCity="+ arrivalCity +"&arrivalCountry="+ arrivalCountry +"&arrivalDate="+ arrivalDate +"&nbPlace="+ nbrePlaces +"&price="+ price +"&appointmentAddress="+ appointmentTravel+"&rank="+ rank;
    function2(dataRequest);
    createRideJson(dataRequest);
}

// function create travel API
function createTravelJson(dataRequest){
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/travel/suggest/jsonp?"+dataRequest,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data)
        {
            travelId = data.travelID;
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}

// function create ride API
function createRideJson(dataRequest) {
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/travel/affectRide/jsonp?"+dataRequest,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data)
        {

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}

// function get city
function getCity(place){
    var placeArray = new Array();
    var placeColumn = "";
    var i = 0;
    var j = 0;
    while(i< place.length) {
        if(place[i] != ","){
            placeColumn += place[i];
            i++;
        }
        if(place[i] == "," || i == place.length){
            placeArray[j] = placeColumn;
            placeColumn = "";
            if(i != place.length){
                j++;
            }
            i = i + 2;
        }
    }
    return placeArray[j-1];
}

//function get country
function getCountry(place){
    var placeArray = new Array();
    var placeColumn = "";
    var i = 0;
    var j = 0;
    while(i< place.length) {
        if(place[i] != ","){
            placeColumn += place[i];
            i++;
        }
        if(place[i] == "," || i == place.length){
            placeArray[j] = placeColumn;
            placeColumn = "";
            if(i != place.length){
                j++;
            }
            i = i + 2;
        }
    }
    return placeArray[j];
}

//function get time format
function timeParse(date,time){
    var parsedDate = date+" "+time;
    var dateForm = new Date(parsedDate);
    var year = dateForm.getFullYear();
    var month = dateForm.getMonth()+1;
    var day = dateForm.getDate();
    var hour = dateForm.getHours();
    var minute = dateForm.getMinutes();

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
    var dateFinal = (month+'/'+day+'/'+year);
    var hourFinal = (hour+':'+minute);

    return dateFinal+" "+hourFinal;
}


// first function PROMISE for ride affection
// Blocks all other async javascript functions
function function1(dataRequest){
    var dfrd1 = $.Deferred();
    var dfrd2= $.Deferred();

    setTimeout(function(){
        createTravelJson(dataRequest);
        dfrd1.resolve();
    }, 1000);

    setTimeout(function(){
        // doing more async stuff
        dfrd2.resolve();
    }, 750);

    return $.when(dfrd1, dfrd2).done(function(){
        // Both asyncs tasks are done
    }).promise();
}

// second function PROMISE/RESOLVE for ride affectation
function function2(){
    var dfrd1 = $.Deferred();
    setTimeout(function(){
        dfrd1.resolve();
        document.getElementById("loading").style.display = "none";
        window.localStorage.removeItem("rideCmpt");
        window.localStorage.removeItem("dateTravel");
        window.localStorage.removeItem("departureTravel");
        window.localStorage.removeItem("timeTravel");
        window.localStorage.removeItem("appointmentTravel");
        window.localStorage.removeItem("arrivalTravel");
        window.localStorage.removeItem("arrivalTravelTime");
        window.top.location = "carPoolSuggestSuccess.html";
    }, 2000);
    return dfrd1.promise();
}