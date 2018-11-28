
$(document).ready(function(){
   
    // request all parcels
    var $parcels = $("#parcels");
    $.ajax({  
        url: URL+'parcels',  
        type: 'GET',  
        dataType: 'json',   
        success: function (parcels, textStatus, xhr) { 
            $.each(parcels, function (i, parcel) {
                $.each(parcel, function (i, parcel) {
                    // console.log(value);
                    $parcels.append("<div class='l-v-padding oneparcel'>"
                    +"<div class='s1 m1 l1'>#"+(i+1)+"<br><span class='bold m-v-margin'>"+parcel.title+"</span><br>"+convertTime(parcel.created_time)+"</div>"
                    +"<div class='s1 m1 l1'>Pickup: "+parcel.pickup+"<br>Dropoff: "+parcel.dropoff+"</div>"
                    +"<div class='s1 m1 l1'>"+parcel.state+"</div>"
                    +"<div class='s1 m1 l1'>"
                    +"<a href='change-status.html' class='btn jazzberry text-white radius-5'>Change Status</a>"
                    +"<a href='order.html?id="+parcel.id+"' class='btn indigo text-white radius-5'>Details</a>"
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
});

function convertTime(time){
    var date = new Date(time);
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
   
}