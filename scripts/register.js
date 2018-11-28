register = () =>{
    $('.loading').show();
    $('#message').html('');
      var name  = document.getElementById("name").value;
      var email  = document.getElementById("email").value;
      var password  = document.getElementById("password").value;
      var data = JSON.stringify({name:name, email:email, password:password });
   
      $.ajax({
        url: URL+'auth/signup',
        method: 'POST',
        contentType: 'application/json',
        data:data,
        success: function(res){
            $('#message').html(res.message);
            $('.loading').hide();
        }
    });
    // call function to compute amstrong number;
    //  checkInput = (name, email, password) => {
    //     document.getElementById("submit").setAttribute('disabled','true');
    //  }
    //  if(
    //      typeof name === 'string' && 
    //      name !== 'undefined' && 
    //      name.length < 2 &&
    //      name.length  > 30  &&
    //      typeof email === 'string' && 
    //      email !== 'undefined' && 
    //      email.length <= 5 &&
    //      email.length  >= 30  &&
    //      password !== 'undefined' && 
    //      password.length <= 6 &&
    //      password.length  >= 30
    //      ){
        
    //  }else{
    //     document.getElementById("message").innerHTML = "Error, check your entry.";
    //  }
    // const data = JSON.stringify({name:name, email:email, password:password });


    // $.ajax({
    //     url:URL+'parcels/', 
    //     type: 'POST', 
    //     contentType: 'application/json',
    //     data:data,
    //     success: function (parcel, textStatus, xhr) {
    //         console.log('hano'+parcel)
    //     // // const p = parcel.parcel.pickup;
    //     // // const d = parcel.parcel.dropoff;
    //     //     $("#title").html(parcel.parcel.title);
    //     //     $("#state").html(parcel.parcel.state);
    //     //     $("#description").html(parcel.parcel.description);
    //     //     $("#pickup").html(parcel.parcel.pickup);
    //     //     $("#dropoff").html(parcel.parcel.dropoff);
    //     //     // map
    //     //     // mapping(d,p)
    //         $(".loading").hide();
    //     },  
    //     error: function (xhr, textStatus, errorThrown) {  
    //         console.log('Error in Operation');  
    //     }          
    
    //     /* Success and error functions here*/
    // });
    
    // $.ajax({  
    //     url: URL+'parcels/'+data,  
    //     type: 'POST',  
    //     // data:data,
    //     crossDomain: true,
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     // async: true,
    //     // beforeSend: function (xhr) {
    //     //     xhr.setRequestHeader ("Authorization", "Bearer "+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJpYXQiOjE1NDMzNTEwMTF9.ypDlkIzVxFedCNPXbu-6nWk6Iet5VxYGuw4SlEqnvBY');
    //     // },
    //     success: function (parcel, textStatus, xhr) {
    //         console.log('hano'+parcel)
    //     // // const p = parcel.parcel.pickup;
    //     // // const d = parcel.parcel.dropoff;
    //     //     $("#title").html(parcel.parcel.title);
    //     //     $("#state").html(parcel.parcel.state);
    //     //     $("#description").html(parcel.parcel.description);
    //     //     $("#pickup").html(parcel.parcel.pickup);
    //     //     $("#dropoff").html(parcel.parcel.dropoff);
    //     //     // map
    //     //     // mapping(d,p)
    //         $(".loading").hide();
    //     },  
    //     error: function (xhr, textStatus, errorThrown) {  
    //         console.log('Error in Operation');  
    //     }  
    // }); 

}