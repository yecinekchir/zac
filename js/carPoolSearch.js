/**
 * Created by Yassine on 10/12/2015.
 */
function initialize() {
    var options = {
        types: ['(cities)']
    };
    var input = document.getElementById('departureField');
    var input2 = document.getElementById('arrivalField');
    var autocomplete = new google.maps.places.Autocomplete(input , options);
    var autocomplete = new google.maps.places.Autocomplete(input2 , options);
}
google.maps.event.addDomListener(window, 'load', initialize);
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
var key = window.localStorage.getItem("apiKey");
function testApi(){
    $('#rechercheResult').empty();
    var departure = document.getElementById("departureField").value;
    var arrival = document.getElementById("arrivalField").value;
    var date = document.getElementById("inputDate").value;
    document.getElementById("errorMessage").innerHTML = "";
    if(!verifContent(departure)){
        document.getElementById("errorMessage").innerHTML = "<br>Please select departure city";
        return;
    }
    if(!verifContent(arrival)){
        document.getElementById("errorMessage").innerHTML = "<br>Please select an arrival city";
        return;
    }
    if(!verifContent(date)){
        document.getElementById("errorMessage").innerHTML = "<br>Please select the date";
        return;
    }
    var dateForm = timeParse(date,"00:00");
    var departureCity =  getCity(departure);
    var arrivalCity =  getCity(arrival);
    departureLocal = departureCity;
    arrivalLocal = arrivalCity;
    var dataRequest = "key="+key+"&departureCity="+departureCity+"&date="+dateForm+"&arrivalCity="+arrivalCity;
    document.getElementById("loading").style.display = "block";
    function1(dataRequest).done(function(){
        function2().done(function(){
            //function2 is done
        });
    });
}
var departureLocal = "";
var arrivalLocal = "";

function function1(dataRequest){
    var dfrd1 = $.Deferred();
    var dfrd2= $.Deferred();

    setTimeout(function(){
        searchTravel(dataRequest);
        dfrd1.resolve();
    }, 1000);

    setTimeout(function(){
        dfrd2.resolve();
    }, 750);

    return $.when(dfrd1, dfrd2).done(function(){
        // Both asyncs tasks are done
    }).promise();
}

function function2(){
    var dfrd1 = $.Deferred();
    setTimeout(function(){
        showResult();
        document.getElementById("loading").style.display = "none";
        dfrd1.resolve();
    }, 2000);
    return dfrd1.promise();
}
var departureTravel = new Array();
function searchTravel(dataRequest){
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/travel/find/jsonp?"+dataRequest,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data)
        {
            departureTravel = [];
            for(i=0;i<data.travels.length;i++)
            {
                departureTravel[i]=data.travels[i];
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}
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

function verifContent(content){
    if(content == ""){
        return false;
    }
    else return true;
}

function getArrivalRank(travelNb,arrivalCity) {
    for(i=0;i<departureTravel[travelNb].ride.length;i++){
        if(departureTravel[travelNb].ride[i].arrivalCity == arrivalCity){
            return departureTravel[travelNb].ride[i].rank;
        }
    }
}

function verifNbPlaces(travelNb,rideRank,arrivalRank){
    for(i=0;i<departureTravel[travelNb].ride.length;i++){
        if ((departureTravel[travelNb].ride[i].nbPlaces <1) && (departureTravel[travelNb].ride[i].rank>=rideRank) && (departureTravel[travelNb].ride[i].rank<=arrivalRank)){
            return false;
        }
    }
    return true;
}

function redirectResult(arrayVal) {
    var travelNb = arrayVal[1];
    var rankSearch = arrayVal[2];
    var rideNb;
    for(i=0;i<departureTravel[travelNb].ride.length;i++){
        if(departureTravel[travelNb].ride[i].rank == rankSearch){
            rideNb = i;
        }
    }
    var travelID = departureTravel[travelNb].id;
    var carName = departureTravel[travelNb].carName;
    var carModel = departureTravel[travelNb].carModel;
    var carColor = departureTravel[travelNb].carColor;
    var bagsAllowed = departureTravel[travelNb].bagsAllowed;
    var breakAllowed = departureTravel[travelNb].breakAllowed;
    var additionalOption = departureTravel[travelNb].additionalOption;
    var startDate = departureTravel[travelNb].ride[rideNb].startDate;
    var rideId = departureTravel[travelNb].ride[rideNb].id;
    var rideRank = departureTravel[travelNb].ride[rideNb].rank;
    var nbPlaces = departureTravel[travelNb].ride[rideNb].nbPlaces;
    var price = departureTravel[travelNb].ride[rideNb].price;
    var departureCity = departureTravel[travelNb].ride[rideNb].departureCity;
    var arrivalCity = arrivalLocal;
    var appointmentAddress = departureTravel[travelNb].ride[rideNb].appointmentAddress;
    var arrivalRank = getArrivalRank(travelNb,arrivalCity);
    var verifPlaces = verifNbPlaces(travelNb,rideRank,arrivalRank);
    window.top.location = "carPoolRide.html?travelID="+travelID+"&rideID="+rideId+"&carName="+carName+"&carModel="+carModel+"&carColor="+carColor+"&bagsAllowed="+bagsAllowed+"&breakAllowed="+breakAllowed+"&additionalOption="+additionalOption+"&startDate="+startDate+"&nbPlaces="+nbPlaces+"&price="+price+"&departureCity="+departureCity+"&arrivalCity="+arrivalCity+"&appointmentAddress="+appointmentAddress+"&arrivalRank="+arrivalRank+"&verifPlaces="+verifPlaces;
}
function showResult()
{
    for(i=0;i<departureTravel.length;i++)
    {
        if(departureTravel[i].status == 2){
            var tempArray = new Array();
            var departureCity;
            var arrivalCity;
            var departureDate;
            for(j=0;j<departureTravel[i].ride.length;j++){
                tempArray[departureTravel[i].ride[j].rank] = departureTravel[i].ride[j];
                if(departureTravel[i].ride[j].rank == (departureTravel[i].ride.length -1)){
                    arrivalCity = departureTravel[i].ride[j].arrivalCity;
                }
                if(departureTravel[i].ride[j].rank == 0){
                    departureDate = departureTravel[i].ride[j].startDate;
                }
            }
            var a = document.createElement("li");
            var b = document.createElement("p");
            departureCity = tempArray[0].departureCity;
            b.innerHTML = departureCity+" <i class=\"zmdi zmdi-arrow-forward\"><\/i> "+arrivalCity;
            b.style.color = "#607D8B";
            b.style.fontSize= "medium";

            var e = document.createElement("div");
            e.innerHTML = "<a data-role=\"button\" class=\"ui-btn ui-btn-inline ui-mini ui-btn-raised clr-primary\" style=\"position: absolute; right: 6px;top:20px;\" id=\"reserve\">Details</a>";


            var c = document.createElement("p");
            c.style.color = "#9E9E9E";
            c.style.fontSize = "small";

            for(z=0;z<tempArray.length;z++)
            {
                c.innerHTML += tempArray[z].departureCity + " (" + tempArray[z].nbPlaces + ") <i class=\"zmdi zmdi-arrow-forward\"><\/i> ";
                if(departureLocal == tempArray[z].departureCity )
                {
                    e.value = "t"+i+""+tempArray[z].rank;
                    e.onclick = function() {redirectResult(this.value)};
                }
            }
            c.innerHTML += arrivalCity;

            var k = new Date(departureDate);

            var d = document.createElement("p");
            b.style.color = "#607D8B";
            d.innerHTML = k.toDateString()+" "+ k.getHours()+":"+ k.getMinutes();
            d.style.fontSize = "small";


            var br = document.createElement("p");
            br.innerHTML = " <hr class=\"inset\">";

            br.style.width = "98%";
            br.style.display ="block";
            br.style.marginLeft ="auto";
            br.style.marginRight="auto";

            e.appendChild(b);
            e.appendChild(d);
            e.appendChild(c);
            a.appendChild(e);
            a.appendChild(br);
            document.getElementById("rechercheResult").appendChild(a);
        }
    }
}