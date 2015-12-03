var dataGlobal = "";

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
          if((data.status==true)&&(data.reservation_list.length>0)) {
              var i=data.reservation_list.length - 1;
              var j = 0;
              for(i-1;i>0;i--){
                  if(j==10){break;}
                if (data.reservation_list[i].state != "4") {
                  j++;
                  var color;
                  var status;
                  var car;
                  var id = data.reservation_list[i].id;

                  if (data.reservation_list[i].state=="1"){
                      color="red";
                      status="Refused";
                  }
                  else if(data.reservation_list[i].state=="2"){
                      color = "#FF9800";
                      status = "Cancelled";
                  }
                  else if(data.reservation_list[i].state=="3"){
                      color = "#4CAF50";
                      status = "Accepted";
                  }
                  else if(data.reservation_list[i].state=="5"){
                      color = "#2196F3";
                      status = "Completed";
                  }
                  else{
                      color = "#4CAF50";
                      status = "Archieved";
                  }
                  if (data.reservation_list[i].carId=="1"){
                      car="BMW I3";
                  }
                  else if(data.reservation_list[i].carId=="2"){
                      car="Peugeot Ion";
                  }
                  else if(data.reservation_list[i].carId=="3"){
                      car="BMW I8";
                  }
                  else{
                      car="Undifined Model";
                  }

                  var a = document.createElement("li");

                  var b = document.createElement("p");
                  var d=data.reservation_list[i].start;
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
                  e.id = id;
                  e.innerHTML = "<a href=\"#popupDialog\" data-rel=\"popup\" data-position-to=\"window\" data-role=\"button\" data-inline=\"true\" data-transition=\"pop\" class=\"ui-btn ui-btn-inline ui-mini ui-btn-raised clr-primary\" style=\"position: absolute; right: 6px;top:20px;\" id=\"reserve\" onclick=\"getDetails("+id+")\">Details</a>"

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
                }
              }

          }
          else{document.getElementById("listReservations").innerHTML="No reservation Found";}
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
          console.log(jqXHR);
          document.getElementById("listReservations").innerHTML="Data loading error : Please verify your connexion";
      }
      })
}

////Get Reservatio Details
function getDetails(reservationId) {
  $.ajax
  ({
      url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/reservation/userReservation/jsonp?"+dataGlobal,
      type: "GET",
      jsonpCallback: 'jsonCallback',
      contentType: 'application/json',
      dataType: 'jsonp',
      async: false,
      success: function(data) {
          var car;
          var decompteur = reservationId -1;
          if (data.reservation_list[decompteur].carId=="1"){
              car="BMW I3";
          }
          else if(data.reservation_list[decompteur].carId=="2"){
              car="Peugeot Ion";
          }
          else if(data.reservation_list[decompteur].carId=="3"){
              car="BMW I8";
          }
          else{
              car="Undifined Model";
          }
          var d=data.reservation_list[decompteur].start;
          var k = new Date(d);
          var b = k.toDateString();
          var c = k.toLocaleTimeString();
          var m=data.reservation_list[decompteur].end;
          var n = new Date(m);
          var o = n.toDateString();
          var p = n.toLocaleTimeString();
          document.getElementById("reservationTitle").innerHTML = b;
          document.getElementById("startDate").innerHTML = "<b>Start Time : </b>" + c;
          document.getElementById("startStation").innerHTML = "<b>Start Station : </b>" + data.reservation_list[decompteur].departureStation;
          document.getElementById("endDate").innerHTML = "<b>End Date : </b>" + o ;
          document.getElementById("endTime").innerHTML = "<b>End Time : </b>" + p;
          document.getElementById("endStation").innerHTML = "<b>End Station : </b>" + data.reservation_list[decompteur].arrivalStation;
          document.getElementById("carModel").innerHTML = "<b>Car Model : </b>" + car;
          var decompCancel = decompteur+1;
          var key = window.localStorage.getItem("apiKey");
          var dataCancel = "key=" + key + "&id=" + decompCancel;
          if(data.reservation_list[decompteur].state=="3"){
              document.getElementById("cancelButton").style.display="block";
          }
          else{
              document.getElementById("cancelButton").style.display="none";
          }
          document.getElementById("cancelButton").onclick = function() { cancelReservation(dataCancel); };
          document.getElementById("deleteButton").onclick = function() { deleteReservation(dataCancel); };
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
          console.log(jqXHR);
          document.getElementsByTagName("ul")[0].innerHTML="Data loading error : Please verify your connexion";

      }
      })
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
          console.log(jqXHR);
          document.getElementsByTagName("ul")[0].innerHTML="Data loading error : Please verify your connexion";

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
          console.log(jqXHR);
          document.getElementsByTagName("ul")[0].innerHTML="Data loading error : Please verify your connexion";

      }
      })
    }

/////Update Panel Function
function update(){
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