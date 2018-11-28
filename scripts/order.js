// $(document).ready(function(){   
    var id = window.location.toString().split('id=')[1];
    // request parcel
    getOrderInfo(id);
    getLocations(id);
// });
// alert(parcel.parcel.pickup);
// get Order Info
function getOrderInfo(id){
    $.ajax({  
        url: URL+'parcels/'+id,  
        type: 'GET',  
        dataType: 'json',   
        success: function (parcel, textStatus, xhr) {
        // const p = parcel.parcel.pickup;
        // const d = parcel.parcel.dropoff;
            $("#title").html(parcel.parcel.title);
            $("#state").html(parcel.parcel.state);
            $("#description").html(parcel.parcel.description);
            $("#pickup").html(parcel.parcel.pickup);
            $("#dropoff").html(parcel.parcel.dropoff);
            // map
            // mapping(d,p)
            $(".loading").hide();
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }  
    });      
}

// get location by order
function getLocations(id){
    var $parcels = $("#locations");
    $.ajax({  
        url: URL+'parcels/'+id+"/locations",  
        type: 'GET',  
        dataType: 'json',   
        success: function (locations, textStatus, xhr) { 
            $.each(locations, function (i, location) {
                $.each(locations, function (i, location) {
                    $parcels.append("<div class='l-v-padding oneparcel'>"
                    +"<div class='s1 m1 l1'>#"+(i+1)+" - "+convertTime(location.created_time)+"</div>"
                    +"<div class='s1 m1 l1'>"+location.longitude+"</div>"
                    +"<div class='s1 m1 l1'>"+location.latitude+"</div>"
                    +"<div class='s1 m1 l1'>"
                    +location.message
                    +"</div>"
                    +"<div class='clear'></div></div>");
                });
            });
            $(".loading").hide();
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }  
        
    });    
      
}

function convertTime(time){
    var date = new Date(time);
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
}


// // managing map

//     var directionsService = new google.maps.DirectionsService();
//     var directionsDisplay = new google.maps.DirectionsRenderer();

//     var map;
            
//     var pickup = new google.maps.LatLng(-1.958394, 30.069553);
//     var dropoff = new google.maps.LatLng(-1.944676, 30.0897449);

//     var mapOptions = {
//         zoom:14,
//         center:pickup
//     }        
//     map = new google.maps.Map(document.getElementById('canvas'), mapOptions);
//     directionsDisplay.setMap(map);
//     function calculateRoute(){
//         var request = {
//             origin: pickup,
//             destination: dropoff,
//             travelMode:'DRIVING'
//         }
//         directionsService.route(request,function(result, status){
//             if(status == 'OK'){
//                 directionsDisplay.setDirections(result);
//             }
//         });
//     }
//     calculateRoute();
