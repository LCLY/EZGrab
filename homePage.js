//Get
//var bla = $('#txt_name').val();

//Set
//$('#txt_name').val(bla);

$(document).ready(function(){
    $("#backgroundImage").fadeIn(1000);
    $("#tableDemo").hide();

    //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
   $("#btnHome").click(function(){
       console.log("clicked!");    
       //animation
        // Handler for .ready() called.
        $("#tableDemo").show();
        $('html, body').animate({
        scrollTop: $('#tableDemo').offset().top
        }, 'slow');
   });

   $("#linkToLogin").click(function(){
        $('#signUpModal').modal('hide');
   });

   

});

