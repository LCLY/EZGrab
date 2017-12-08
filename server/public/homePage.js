//Get
//var bla = $('#txt_name').val();

//Set
//$('#txt_name').val(bla);
var gQuery;
$(document).ready(function () {
    $("#backgroundImage").slideDown('slow').fadeIn(2000);
    $("#grootGif").slideDown('slow');

    $("#tableDemo").hide();
    $('#userProfileInformationDiv').hide();
    $('#userProfile').hide();
    $('#userRequests').hide();
    $('#acceptedRequests').hide();
    $('#ordersAvailable').hide();
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
                $('#ordersAvailable').show();
            }
        }). fail(function(error) {
            console.log(error);
            alert(error.responseJSON.message);
        });
    });

    $('#userProfile').click(function () {
        $('#tableDemo').hide();
        $('#userProfileInformationDiv').show();
        var queryString = "";
        var url = "http://localhost:8000/senderOrdersGet";
        queryString = url + "?currentUser=" + sessionStorageGet("CurrentEmployeeID", null);
        gQuery = queryString;
        $.get(queryString, function (data) {
            console.log(data);
            console.log(data[0].ID);
            $('#txtFirstName').val(data[0].Recipient);
            
        }).fail(function (error) {
            console.log(error);
            alert(error);
    });


    $('#btnHome').click(function () {
        $('#tableDemo').show();
        $('#userProfileInformationDiv').hide();       
    });

    $('#btnGenerateOrders').click(function () {
        var queryString = "";
        var url = "http://localhost:8000/recipientOrdersGet";
        queryString = url;
        gQuery += "&recipientOrdersGet";
        $.get(gQuery, function (data) {
            console.log(data);
            console.log(data[0].ID);
            $('#txtFirstName').val(data[0].Recipient);
            for(var i = 0; i < data.length; i++){
            var div = $("<div id=\"ordersAvailable\">"+ data[i].ID + data[i].BuyLocation + data[i].DropLocation+"</div>");
            $("#ordersAvailable").append(div);  
            }  


        }).fail(function (error) {
            console.log(error);
            alert(error);
    });


    $("#linkToLogin").click(function () {
        $('#signUpModal').modal('hide');
    });
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