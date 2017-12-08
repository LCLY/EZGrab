//Get
//var bla = $('#txt_name').val();

//Set
//$('#txt_name').val(bla);

$(document).ready(function () {
    $("#backgroundImage").slideDown('slow').fadeIn(2000);
    $("#grootGif").slideDown('slow');

    $("#tableDemo").hide();
    $('#userProfileInformationDiv').hide();
    $('#userProfile').hide();
    $('#userRequests').hide();
    $('#acceptedRequests').hide();
    //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
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
        var url = "18.216.191.121:8000";
        console.log("comes here")


        $.post("http://18.216.191.121:8000/signin",
        {
            username: $('#inputLoginUsername').val(),
            password: $('#inputLoginPassword').val()
        },

        function (data, status) {
            console.log("Data: " + data + "\nStatus: " + status);
            if(status === "success"){
                sessionStorageSet("CurrentEmployeeID", $('#inputLoginUsername').val());
                gCurrentEmployeeID = sessionStorageGet("CurrentEmployeeID", null);
                $('#backgroundImage').hide();
                $('#grootGif').hide();
                $('#userProfile').show();
                $('#userRequests').show();
                $('#acceptedRequests').show();
                $("#tableDemo").show();
                $('#loginModal').modal('hide');
            }
        }). fail(function(error) {
            console.log(error);
            alert(error.responseJSON.message);
        });
    });

    $('#userProfile').click(function () {
        $('#tableDemo').hide();
        $('#userProfileInformationDiv').show();
        $.get("http://18.216.191.121:8000/", 
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
            if (status === "success") {
               
            }            
              
        }).fail(function (error) {
            console.log(error);
            alert(error.responseJSON.message);
    });


    $('#btnHome').click(function () {
        $('#tableDemo').show();
        $('#userProfileInformationDiv').hide();
    });

    $("#linkToLogin").click(function () {
        $('#signUpModal').modal('hide');
    });
});




// These functions encapsulate local and session storage for consistencty and to simplify handling 
// default values.

function localStorageGet(token, defaultValue) {

    var value = localStorage.getItem(token);

    if (value === null) {
        return defaultValue;
    }

    return value;
}

function localStorageSet(token, value) {
    localStorage.setItem(token, value);
}

function sessionStorageGet(token, defaultValue) {

    var value = sessionStorage.getItem(token);

    if (value === null) {
        return defaultValue;
    }

    return value;
}

function sessionStorageSet(token, value) {
    sessionStorage.setItem(token, value);
}

});