//////////////////////////////////////////////////////////////
// CarShare Reservation : Initialisation of date and params //
//////////////////////////////////////////////////////////////
function setDate() {
    var currentTime = new Date();
    var month = parseInt(currentTime.getMonth())+parseInt(1);
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    var hour = currentTime.getHours();
    var hour2 = currentTime.getHours()+parseInt(1);
    var minute = currentTime.getMinutes()+15;
    if(month<10) {
        month = "0" + month;
    }
    if (minute == 0) {
      minute = "15";
    }
    if (minute == 15) {
      minute = "30";
    }
    if (minute == 30) {
      minute = "45";
    }
    if (minute == 45) {
      minute = "00";
      hour = hour + 1;
      hour2 = hour2 + 1;
      if (hour > 23) {
        hour = "00";
        hour2 = "01";
        day = day + 1;
      }
    }
    if (minute>0 && minute<15) {
      minute="15";
    }
    if(minute>15 && minute<30){
      minute="30";
    }
    if (minute>30 && minute<45) {
      minute="45";
    }
    if (minute>45) {
      minute="00";
      hour = hour + 1;
      hour2 = hour2 + 1;
    }
    if(hour<10) {
        hour = "0" + hour;
    }
    if(hour2<10) {
        hour2 = "0" + hour2;
    }
    if(day<10) {
        day = "0" + day;
    }
    var dt = (year+'-'+month+'-'+day);
    
    if (hour=="23"){hour2="00";}
    if (hour=="24"){hour2="01";}

    var hm = (hour+':'+minute);
    var hm2 = (hour2+':'+minute);
    
    
    
    document.getElementById("startDate").value=dt;
    document.getElementById("startTime").value=hm;
    document.getElementById("endDate").value=dt;
    document.getElementById("endTime").value=hm2;
}

function verif(){
    if( document.getElementById("startDate").value > document.getElementById("endDate").value ){
        document.getElementById("errorMessage").textContent="Please verify the dates";
    }
    else{
       document.getElementById("errorMessage").textContent="";
       window.localStorage.setItem("iReload",0);
       window.localStorage.removeItem("resReq");
       window.localStorage.removeItem("departure");
       window.localStorage.removeItem("returning");
        
        
        ///Get Date Elements
       var departure = $("#startDate").val()+" "+$("#startTime").val();
       var startTime = $("#startTime").val();
       var returning = $("#endDate").val()+" "+$("#endTime").val();
        
        //Create Date Forms
        var departureForm = new Date(departure);
        var depMonth = departureForm.getMonth()+1;
        var depDay = departureForm.getDate();
        var depHour = departureForm.getHours();
        var depMinute = departureForm.getMinutes();
        
        var returningForm = new Date(returning);
        var depMonthRet = returningForm.getMonth()+1;
        var depDayRet = returningForm.getDate();
        var endHour = returningForm.getHours();
        var endMinute = returningForm.getMinutes();
        
        ///Departure Date Adjust
       
        if (depMinute>0 && depMinute<15) {
          depMinute="15";
        }
        if(depMinute>15 && depMinute<30){
          depMinute="30";
        }
        if (depMinute>30 && depMinute<45) {
          depMinute="45";
        }
        if (depMinute>45 && depMinute<59) {
          depMinute="00";
          depHour = depHour + 1;
            if((depHour - 1) == endHour){
                endHour = endHour + 1;
            }    
        }
        if (depMinute==0) {
          depMinute="00";
        }
        if(depHour<10) {
            depHour = "0" + depHour;
        }

        if (depHour=="23" && endHour == "23"){endHour="00";}
        if (depHour=="24" && endHour == "24"){endHour="01";}
        if (depMonth < 10) {
         depMonth = "0"+depMonth;
        }
        if (depDay < 10) {
         depDay = "0"+depDay;
        }
        
        var depTime = (depHour+':'+depMinute);
        var depFinal = depMonth+"/"+depDay+"/"+departureForm.getFullYear()+" "+depTime;
        
        
        /////Returning Date Adjust
        if (endMinute>0 && endMinute<15) {
          endMinute="15";
        }
        if(endMinute>15 && endMinute<30){
          endMinute="30";
        }
        if (endMinute>30 && endMinute<45) {
          endMinute="45";
        }
        if (endMinute>45 && endMinute<59) {
          endMinute="00";
          endHour = endHour + 1;
        }
        if (endMinute==0) {
          endMinute="00";
        }
        if(endHour==0) {
            endHour = "00";
        }
        if(endHour<10) {
            endHour = "0" + depHour;
        }
        if (depMonthRet < 10) {
         depMonthRet = "0"+depMonthRet;
        }
        if (depDayRet < 10) {
         depDayRet = "0"+depDayRet;
        }
        var endTime = (endHour+':'+endMinute);
        var retFinal = depMonthRet+"/"+depDayRet+"/"+returningForm.getFullYear()+" "+endTime;
        
        
        // compare the times
        if(depDay == depDayRet){
            
            if(depHour>endHour){
                document.getElementById("errorMessage").textContent="Please verify the time";
            }
            
            else if(depHour == endHour){
                
                if(depMinute>endMinute){
                    document.getElementById("errorMessage").textContent="Please verify the time";
                }

                else if(depMinute==endMinute){
                    document.getElementById("errorMessage").textContent="Please verify the time";
                }

                else{
                    window.localStorage.setItem("departure",depFinal);
                    window.localStorage.setItem("returning",retFinal);
                    window.top.location="carShareReservationStep2.html";
                }
            }
            else {
                window.localStorage.setItem("departure",depFinal);
                window.localStorage.setItem("returning",retFinal);
                window.top.location="carShareReservationStep2.html";
            }
        }
        else {
            window.localStorage.setItem("departure",depFinal);
            window.localStorage.setItem("returning",retFinal);
            window.top.location="carShareReservationStep2.html";
        }
    }
}
