/**
 * Created by Yassine.
 **/


var dataGlobal = "";
var reservation_list = new Array();

/////Initialisation
function check() {
    var key = window.localStorage.getItem("apiKey");
    var dataReq = "key="+key;
    dataGlobal = dataReq;
    authenticate(dataReq);
}

//// Get History
function authenticate(dataReq) {
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/reservation/userReservation/jsonp?"+dataReq,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data)
        {
            for(i=0;i<data.reservation_list.length;i++){
                reservation_list[i]=data.reservation_list[i];
            }
            showResult()
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
        }
    })
}

function showResult(){
    var i=reservation_list.length - 1;
    var j = 0;
    for(i;i>0;i--){
        if(j==10){break;}
        if (reservation_list[i].state != "4") {
            var color;
            var status;
            var car;
            var id = reservation_list[i].id;

            if (reservation_list[i].state=="1"){
                color="red";
                status="Refused";
            }
            else if(reservation_list[i].state=="2"){
                color = "#FF9800";
                status = "Cancelled";
            }
            else if(reservation_list[i].state=="3"){
                color = "#4CAF50";
                status = "Accepted";
            }
            else if(reservation_list[i].state=="5"){
                color = "#2196F3";
                status = "Completed";
            }
            else{
                color = "#4CAF50";
                status = "Archieved";
            }
            if (reservation_list[i].carId=="1"){
                car="BMW I3";
            }
            else if(reservation_list[i].carId=="2"){
                car="Peugeot Ion";
            }
            else if(reservation_list[i].carId=="3"){
                car="BMW I8";
            }
            else{
                car="Undifined Model";
            }

            var a = document.createElement("li");

            var b = document.createElement("p");
            var d=reservation_list[i].start;
            var k = new Date(d);
            b.innerHTML = k.toDateString();
            b.style.color = "#607D8B";
            b.style.fontSize= "medium";

            var c = document.createElement("p");
            c.innerHTML =car ;
            c.style.color = "#9E9E9E";
            c.style.fontSize = "small";

            var d = document.createElement("p");
            d.style.color = color;
            d.innerHTML = status;
            d.style.fontSize = "small";

            var e = document.createElement("div");
            e.innerHTML = "<a href=\"#popupDialog\" data-rel=\"popup\" data-position-to=\"window\" data-role=\"button\" data-inline=\"true\" data-transition=\"pop\" class=\"ui-btn ui-btn-inline ui-mini ui-btn-raised clr-primary\" style=\"position: absolute; right: 6px;top:20px;\" onclick=\"getDetails(this.name)\" name=\""+i+"\">Details</a>";

            var br = document.createElement("p");
            br.innerHTML = " <hr class=\"inset\">";
            br.style.width = "98%";
            br.style.display ="block";
            br.style.marginLeft ="auto";
            br.style.marginRight="auto";

            e.appendChild(b);
            e.appendChild(c);
            e.appendChild(d);
            a.appendChild(e);
            a.appendChild(br);

            document.getElementById("listReservations").appendChild(a);
            j++;
        }
    }
}

function getDetails(pos){
            var car;
            if (reservation_list[pos].carId=="1"){
                car="BMW I3";
            }
            else if(reservation_list[pos].carId=="2"){
                car="Peugeot Ion";
            }
            else if(reservation_list[pos].carId=="3"){
                car="BMW I8";
            }
            else{
                car="Undifined Model";
            }
            var d=reservation_list[pos].start;
            var k = new Date(d);
            var b = k.toDateString();
            var c = k.toLocaleTimeString();
            var m=reservation_list[pos].end;
            var n = new Date(m);
            var o = n.toDateString();
            var p = n.toLocaleTimeString();
            document.getElementById("reservationTitle").innerHTML = b;
            document.getElementById("startDate").innerHTML = "<b>Start Time : </b>" + c;
            document.getElementById("startStation").innerHTML = "<b>Start Station : </b>" + reservation_list[pos].departureStation;
            document.getElementById("endDate").innerHTML = "<b>End Date : </b>" + o ;
            document.getElementById("endTime").innerHTML = "<b>End Time : </b>" + p;
            document.getElementById("endStation").innerHTML = "<b>End Station : </b>" + reservation_list[pos].arrivalStation;
            document.getElementById("carModel").innerHTML = "<b>Car Model : </b>" + car;
            var key = window.localStorage.getItem("apiKey");
            var dataCancel = "key=" + key + "&id=" + reservation_list[pos].id;
            if(reservation_list[pos].state=="3"){
                document.getElementById("cancelButton").style.display="block";
            }
            else{
                document.getElementById("cancelButton").style.display="none";
            }
            document.getElementById("cancelButton").onclick = function() { cancelReservation(dataCancel); };
            document.getElementById("deleteButton").onclick = function() { deleteReservation(dataCancel); };
}


//// Cancel Reservation
function cancelReservation(idCancel){
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/reservation/cancelReservation/jsonp?"+idCancel,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data) {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {

        }
    })
}

///// Delete Reservation
function deleteReservation(idCancel){
    $.ajax
    ({
        url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/reservation/archiveReservation/jsonp?"+idCancel,
        type: "GET",
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        async: false,
        success: function(data) {
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {

        }
    })
}

/////Update Panel Function
function update(){
    if(window.localStorage.getItem("loggedIn") != 1) {
        // Not Logged In
        // Redirect to login page.
        window.top.location="../../index.html";
    }
    else{
        var firstName = window.localStorage.getItem("firstName");
        var lastName = window.localStorage.getItem("lastName");
        var email = window.localStorage.getItem("email");
        document.getElementById("userPar").innerHTML= firstName+" "+lastName;
        document.getElementById("userEmail").innerHTML= email;
    }
}