function verifApi(){
    var apiKey = window.localStorage.getItem("apiKey");
$.ajax
  ({
      url: "http://158.64.4.246:8080/zac-emovin-1.0-SNAPSHOT/api/v1/user/jsonp?key="+apiKey,
      type: "GET",
      jsonpCallback: 'jsonCallback',
      contentType: 'application/json',
      dataType: 'jsonp',
      async: false,
      success: function(data) {
        if(data.status == false){
            window.localStorage.removeItem("loggedIn");
            window.localStorage.removeItem("firstName");
            window.localStorage.removeItem("lastName");
            window.localStorage.removeItem("email");
            window.localStorage.removeItem("apiKey");
            window.top.location = "keyExpiration.html";
        }
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
          console.log(jqXHR);

      }
      })

}