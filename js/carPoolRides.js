/**
 * Created by Yassine on 14/12/2015.
 */
var reservationArray = new Array();
var suggestionArray = new Array();
var requestArray = new Array();
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
function getRides(){
    var key = window.localStorage.getItem("apiKey");
    getRidesJsonP(key);
}
function getRidesJsonP(key){
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/travel/reservations/jsonp?key="+key,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data)
        {
            for(var i=0;i<data.travelRequest.length;i++){
                reservationArray[i]=data.travelRequest[i];
            }
            for(var j=0;j<data.travels.length;j++){
                suggestionArray[j]=data.travels[j];
            }
            for(var k=0;k<data.userRequests.length;k++){
                requestArray[k]=data.userRequests[k];
            }
            showDataReservation();
            showDataSuggestion();
            showDataRequest();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}
function showDataReservation(){
    for(i=0;i<reservationArray.length;i++) {
        if(true){
            var a = document.createElement("li");
            var b = document.createElement("p");
            b.innerHTML = reservationArray[i].ride.departureCity+" <i class=\"zmdi zmdi-arrow-forward\"><\/i> "+reservationArray[i].arrivalCity;
            b.style.color = "#607D8B";
            b.style.fontSize= "medium";

            var e = document.createElement("div");
            if(reservationArray[i].status == 1){
                e.innerHTML = "<a data-role=\"button\" class=\"ui-btn ui-btn-inline ui-mini ui-btn-raised clr-primary\" style=\"position: absolute; right: 6px;top:20px;\" id=\"reserve\">Cancel</a>";
                e.value = reservationArray[i].id;
                e.onclick = function() {cancelRide(this.value)};
            }


            var k = new Date(reservationArray[i].ride.startDate);
            var c = document.createElement("p");
            c.style.color = "#9E9E9E";
            c.style.fontSize = "small";
            c.innerHTML = k.toDateString()+" "+ k.getHours()+":"+ k.getMinutes();



            var d = document.createElement("p");
            if(reservationArray[i].status == 1){
                d.innerHTML = "Pending";
                d.style.color="orange";
            }
            if(reservationArray[i].status == 2){
                d.innerHTML = "Accepted";
                d.style.color="green";
            }
            if(reservationArray[i].status == 3){
                d.innerHTML = "Refused";
                d.style.color="#d9534f";
            }
            if(reservationArray[i].status == 4){
                d.innerHTML = "Cancelled";
                d.style.color="#d9534f";
            }

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
            document.getElementById("reserved").appendChild(a);

        }
    }
}

function showDataSuggestion(){
    for(j=0;j<suggestionArray.length;j++){
        var tempArray = new Array();
        var departureCity;
        var arrivalCity;
        var departureDate;
        for(i=0;i<suggestionArray[j].ride.length;i++){
            tempArray[suggestionArray[j].ride[i].rank] = suggestionArray[j].ride[i].departureCity;
            if(suggestionArray[j].ride[i].rank == (suggestionArray[j].ride.length -1)){
                arrivalCity = suggestionArray[j].ride[i].arrivalCity;
            }
            if(suggestionArray[j].ride[i].rank == 0){
                departureDate = suggestionArray[j].ride[i].startDate;
            }
        }
        if(suggestionArray[j].ride.length>0){
            var a = document.createElement("li");
            var b = document.createElement("p");
            departureCity = tempArray[0];
            b.innerHTML = departureCity+" <i class=\"zmdi zmdi-arrow-forward\"><\/i> "+arrivalCity;
            b.style.color = "#607D8B";
            b.style.fontSize= "medium";

            var e = document.createElement("div");
            if(suggestionArray[j].status == 2){
                e.innerHTML = "<a data-role=\"button\" class=\"ui-btn ui-btn-inline ui-mini ui-btn-raised clr-primary\" style=\"position: absolute; right: 6px;top:20px;\" id=\"reserve\">Cancel</a>";
                e.value = suggestionArray[j].id;
                e.onclick = function() {cancelTravel(this.value)};
            }

            if(suggestionArray[j].status == 3){
                e.innerHTML = "<a data-role=\"button\" class=\"ui-btn ui-btn-inline ui-mini ui-btn-raised clr-primary ui-disabled\" style=\"position: absolute; right: 6px;top:20px;background-color: #d9534f;\" id=\"reserve\">Cancelled</a>";
            }


            var c = document.createElement("p");
            c.style.color = "#9E9E9E";
            c.style.fontSize = "small";

            for(h=0;h<tempArray.length;h++)
            {
                c.innerHTML += tempArray[h] + " - ";
            }
            c.innerHTML += arrivalCity;


            var k = new Date(departureDate);
            var l = document.createElement("p");
            l.style.color = "#9E9E9E";
            l.style.fontSize = "small";
            l.innerHTML = k.toDateString()+" "+ k.getHours()+":"+ k.getMinutes();

            var br = document.createElement("p");
            br.innerHTML = " <hr class=\"inset\">";

            br.style.width = "98%";
            br.style.display ="block";
            br.style.marginLeft ="auto";
            br.style.marginRight="auto";

            e.appendChild(b);
            a.appendChild(e);
            a.appendChild(c);
            a.appendChild(l);
            a.appendChild(br);
            document.getElementById("suggested").appendChild(a);
        }


    }
}

function showDataRequest(){
    for(i=0;i<requestArray.length;i++) {
        if(true){
            var a = document.createElement("li");
            var b = document.createElement("p");
            b.innerHTML = requestArray[i].ride.departureCity+" <i class=\"zmdi zmdi-arrow-forward\"><\/i> "+requestArray[i].arrivalCity;
            b.style.color = "#607D8B";
            b.style.fontSize= "medium";

            var e = document.createElement("div");
            var h = document.createElement("div");
            if(requestArray[i].status == "1"){
                e.innerHTML = "<a data-role=\"button\" class=\"ui-btn ui-btn-inline ui-mini ui-btn-raised clr-primary\" style=\"position: absolute; right: 6px;top:5px;\" id=\"reserve\">Accept</a>";
                e.value = requestArray[i].id;
                e.onclick = function() {acceptRequest(this.value)};
                h.innerHTML = "<a data-role=\"button\" class=\"ui-btn ui-btn-inline ui-mini ui-btn-raised clr-primary\" style=\"position: absolute; right: 6px;top:45px; background-color: #d9534f;\" id=\"reserve\">Decline</a>";
                h.value = requestArray[i].id;
                h.onclick = function() {refuseRequest(this.value)};
            }
            if(requestArray[i].status == "4"){
                h.innerHTML = "<a data-role=\"button\" class=\"ui-btn ui-btn-inline ui-mini ui-btn-raised clr-primary ui-disabled\" style=\"position: absolute; right: 6px;top:20px; background-color: #d9534f;\">Cancelled</a>";
            }
            if(requestArray[i].status == "2"){
                h.innerHTML = "<a data-role=\"button\" class=\"ui-btn ui-btn-inline ui-mini ui-btn-raised clr-primary ui-disabled\" style=\"position: absolute; right: 6px;top:20px;\">Accepted</a>";
            }
            if(requestArray[i].status == "3"){
                h.innerHTML = "<a data-role=\"button\" class=\"ui-btn ui-btn-inline ui-mini ui-btn-raised clr-primary ui-disabled\" style=\"position: absolute; right: 6px;top:20px; background-color: #d9534f;\">Refused</a>";
            }

            var k = new Date(requestArray[i].ride.startDate);
            var c = document.createElement("p");
            c.style.color = "#9E9E9E";
            c.style.fontSize = "small";
            c.innerHTML = k.toDateString()+" "+ k.getHours()+":"+ k.getMinutes();


            var br = document.createElement("p");
            br.innerHTML = " <hr class=\"inset\">";

            var d = document.createElement("p");
            d.innerHTML = requestArray[i].ride.nbPlaces + " remaining place(s)";

            br.style.width = "98%";
            br.style.display ="block";
            br.style.marginLeft ="auto";
            br.style.marginRight="auto";

            e.appendChild(b);
            e.appendChild(d);
            e.appendChild(c);
            a.appendChild(e);
            e.appendChild(h);
            a.appendChild(br);
            document.getElementById("requested").appendChild(a);

        }
    }
}
var key = window.localStorage.getItem("apiKey");


function acceptRequest(requestId){
    var acceptQuery = "key="+key+"&requestId="+requestId;
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/travel/acceptRequest/jsonp?"+acceptQuery,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data)
        {
            window.top.location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}
function refuseRequest(requestId){
    var refuseQuery = "key="+key+"&requestId="+requestId;
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/travel/refuseRequest/jsonp?"+refuseQuery,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data)
        {
            window.top.location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}

function cancelRide(requestId){
    var cancelQuery = "key="+key+"&requestId="+requestId;
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/travel/cancelRide/jsonp?"+cancelQuery,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data)
        {
            window.top.location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}
function cancelTravel(requestId){
    var cancelQuery = "key="+key+"&travelId="+requestId;
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/travel/cancelTravel/jsonp?"+cancelQuery,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data)
        {
            window.top.location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}
