login = () =>{
    $('.loading').show();
    $('#message').html('');
    //   var email  = document.getElementById("email").value;
    //   var password  = document.getElementById("password").value;
    //   var data = JSON.stringify({email:email, password:password });
   
        $.ajax({
          type: "GET",
          url:  URL+'auth/login',
          contentType: 'application/json',
          data: {
            email: "kagaramag@gmail.com",
            password: "123123"
          },
          success: function(data) {
            localStorage.token = data.token;
            alert('Got a token from the server! Token: ' + data.token);
          },
          error: function() {
            alert("Login Failed");
          }
        });
}