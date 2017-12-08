//Get
//var bla = $('#txt_name').val();

//Set
//$('#txt_name').val(bla);

$(window).on("load", function () {
    $("#backgroundImage").slideDown('slow').fadeIn(2000);
    $("#grootGif").slideDown('slow');

    $("#tableDemo").hide();
    $('#userProfileInformationDiv').hide();
    $('#userProfile').hide();
    $('#userRequests').hide();
    $('#acceptedRequests').hide();
    //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
    $("#btnHome").click(function () {
        console.log("clicked!");
        //animation
        // Handler for .ready() called.

    });
    /*
        $('html, body').animate({
            scrollTop: $('#tableDemo').offset().top
        }, 'slow');
    */
    $("#btnLogin").keydown(function (event) {
        if (event.keyCode === 13) {
            $("#btnLogin").click();
        }
    });

    $('#btnLogin').click(function () {
        if ($('#inputLoginUsername').val() === "user" && $('#inputLoginPassword').val() === "password") {
            console.log($('#inputLoginUsername').val());
            console.log($('#inputLoginPassword').val());
            $('#userProfile').show();
            $('#userRequests').show();
            $('#acceptedRequests').show();
            $('#backgroundImage').slideUp('slow').fadeOut(2000);
            $('#grootGif').slideUp('slow').fadeOut(2000);
            $("#tableDemo").show();
            $('#loginModal').modal('hide');
        } else {
            alert("Username or password is wrong!");
        }
    });

    $('#userProfile').click(function () {
        $('#tableDemo').hide();
        $('#userProfileInformationDiv').show();
    });


    $('#btnHome').click(function () {
        $('#tableDemo').show(2000).fadeIn(1000);
        $('#userProfileInformationDiv').hide();
    });

    $("#linkToLogin").click(function () {
        $('#signUpModal').modal('hide');
    });



});


