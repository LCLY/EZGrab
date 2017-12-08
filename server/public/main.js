function body_onload() {
    Vue.component("order-entry", {
        template: "#order-entry-template",
        props: ["buylocation", "droplocation", "recipient", "notes", "id"],
        methods: {
            grabConfirmation: function() {
                app.grabConfirmation(this.id);
            }
        }
    })

    Vue.component("buy-entry", {
        template: "#buy-entry-template",
        props: ["buylocation", "droplocation", "sender", "notes", "id"],
    })

    Vue.component("grab-entry", {
        template: "#grab-entry-template",
        props: ["buylocation", "droplocation", "recipient", "notes", "id"],
    })

    var app = new Vue({
        el:"#app",

        data: {
            signIn:false,
            signInMsg:"",
            orders: [],
            showAddForm:false,
            showBuy:false,
            showMain:false,
            addFormMsg:"",
            buyRequestForm:false,
            grabRequestForm:false,
            settingsForm:false,
            disable:true,
            grabConfirm:false,
            orderid:"",
        },

        methods: {
            checkSignIn: function() {
                var url = "http://18.216.191.121:8000/";

                try {
                    var httpRequest = new XMLHttpRequest();
                    httpRequest.onreadystatechange = httpStateChange;
                    httpRequest.onerror = httpError;
                    httpRequest.open("POST", url + "signin" , true);
                    httpRequest.setRequestHeader("Content-type", "application/json");
                    httpRequest.send(JSON.stringify({ username: signInUsername.value, password: signInPassword.value }));
                } catch (error) {
                    alert("error");
                }

                function httpError(){
                    alert("network error");
                }
            
                function httpStateChange() {
                    if (httpRequest.readyState === 4){
                        if(httpRequest.status === 200) {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            console.log(serverResponse);

                            sessionStorageSet("Username", signInUsername.value);

                            /*localStorageSet("Remember", rememberChkBox.checked);
                            
                            if (rememberChkBox.checked === true) {
                                localStorageSet("Username", usernameInput.value);
                            } else {
                                localStorageSet("Username", "");
                            }*/
                            app.retrieveOrders();
                        } else {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            app.signInMsg = serverResponse.message;
                        }
                    }
                }
            },

            retrieveOrders: function() {
                var url = "http://localhost:8000/";
                
                try {
                    var httpRequest = new XMLHttpRequest();
                    httpRequest.onreadystatechange = httpStateChange;
                    httpRequest.onerror = httpError;
                    httpRequest.open("GET", url + "getOpenOrders" , true);
                    httpRequest.setRequestHeader("Content-type", "application/json");
                    httpRequest.send(null);
                } catch (error) {
                    alert("error");
                }

                function httpError(){
                    alert("network error");
                }
            
                function httpStateChange() {
                    if (httpRequest.readyState === 4){
                        if(httpRequest.status === 200) {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            console.log(serverResponse);

                            app.orders = serverResponse;
                            app.signIn = true;
                            app.disable = false;
                        } else {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            app.signInMsg = serverResponse.message;
                        }
                    }
                }
            },

            addBuyRequest: function() {
                var url = "http://localhost:8000/";

                var currentUser = sessionStorageGet("Username", null);
                
                try {
                    var httpRequest = new XMLHttpRequest();
                    httpRequest.onreadystatechange = httpStateChange;
                    httpRequest.onerror = httpError;
                    httpRequest.open("POST", url + "ordersadd" , true);
                    httpRequest.setRequestHeader("Content-type", "application/json");
                    httpRequest.send(JSON.stringify({
                        recipient: currentUser,
                        buyLocation: buyLocation.value,
                        dropLocation: dropLocation.value,
                        notes: notes.value,
                    }));
                } catch (error) {
                    alert("error");
                }

                function httpError(){
                    alert("network error");
                }
            
                function httpStateChange() {
                    if (httpRequest.readyState === 4){
                        if(httpRequest.status === 200) {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            console.log(serverResponse);

                            app.showAddForm = false;
                            app.retrieveOrders();
                        } else {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            app.addFormMsg = serverResponse.message;
                        }
                    }
                }
            },

            buyRequest: function(){
                var url = "http://localhost:8000/";
                var currentUser = sessionStorageGet("Username",null);
                try {
                    var httpRequest = new XMLHttpRequest();
                    httpRequest.onreadystatechange = httpStateChange;
                    httpRequest.onerror = httpError;
                    httpRequest.open("GET", url + "senderOrdersGet?currentUser=" + currentUser, true);
                    httpRequest.setRequestHeader("Content-type", "application/json");
                    httpRequest.send(null);
                } catch (error) {
                    alert("error");
                }

                function httpError() {
                    alert("network error");
                }

                function httpStateChange() {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200) {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            console.log(serverResponse);
                            app.orders = serverResponse;
                        } else {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            app.signInMsg = serverResponse.message;
                        }
                    }
                }
            },

            grabRequest: function () {
                var url = "http://localhost:8000/";
                var currentUser = sessionStorageGet("Username", null);
                try {
                    var httpRequest = new XMLHttpRequest();
                    httpRequest.onreadystatechange = httpStateChange;
                    httpRequest.onerror = httpError;
                    httpRequest.open("GET", url + "recipientOrdersGet?currentUser=" + currentUser, true);
                    httpRequest.setRequestHeader("Content-type", "application/json");
                    httpRequest.send(null);
                } catch (error) {
                    alert("error");
                }

                function httpError() {
                    alert("network error");
                }

                function httpStateChange() {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200) {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            console.log(serverResponse);
                            app.orders = serverResponse;
                        } else {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            app.signInMsg = serverResponse.message;
                        }
                    }
                }
            },

            settingsUpdate: function(){
                var url = "http://localhost:8000/";

                var currentUser = sessionStorageGet("Username", null);

                try {
                    var httpRequest = new XMLHttpRequest();
                    httpRequest.onreadystatechange = httpStateChange;
                    httpRequest.onerror = httpError;
                    httpRequest.open("POST", url + "updateAccount?currentUser=" + currentUser, true);
                    httpRequest.setRequestHeader("Content-type", "application/json");
                    httpRequest.send(JSON.stringify({
                        username: txtUserName.value,
                        password: txtPassword.value,
                        email: txtEmail.value,
                        mobileNumber: txtMobileNumber.value,
                    }));
                } catch (error) {
                    alert("error");
                }

                function httpError() {
                    alert("network error");
                }

                function httpStateChange() {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200) {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            console.log(serverResponse);
                        } else {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            app.addFormMsg = serverResponse.message;
                        }
                    }
                }
            },

            setHome : function() {
                app.buyRequestForm = false; 
                app.grabRequestForm = false;
                app.settingsForm = false;
                app.retrieveOrders();
            },

            setBuyRequests : function() {
                app.buyRequestForm = true; 
                app.grabRequestForm = false; 
                app.settingsForm = false;
                app.buyRequest();
            },

            setGrabRequests : function() {
                app.grabRequestForm = true; 
                app.buyRequestForm = false;
                app.settingsForm = false;
                app.grabRequest();
            },

            setSettings: function () {
                app.grabRequestForm = false;
                app.buyRequestForm = false;
                app.settingsForm = true;
                app.settingsUpdate();
            },

            recommendMe: function () {
                // var sth = recommend(originInput.value, destination.value);
                // console.log("Order is : ******** " + sth);

                var gOrders = new Array();


                function calculateTimeDiff(graberSta, graberDes, storeLoc, reqestLoc, num, callback) {
                    if (graberSta == null || graberDes == null || storeLoc == null || reqestLoc == null) {
                        return false;
                    }

                    //create queryURL

                    var params1 = {
                        origins: graberSta,
                        destinations: storeLoc + "|" + graberDes,
                        mode: "walking",
                        key: "AIzaSyBb-Cf0pgRz4yUUFFbFaIecXXFuMnmmBVU",
                        language: "en"

                    };

                    var params2 = {
                        origins: storeLoc,
                        destinations: reqestLoc,
                        mode: "walking",
                        key: "AIzaSyBb-Cf0pgRz4yUUFFbFaIecXXFuMnmmBVU",
                        language: "en"

                    };

                    var params3 = {
                        origins: reqestLoc,
                        destinations: graberDes,
                        mode: "walking",
                        key: "AIzaSyBb-Cf0pgRz4yUUFFbFaIecXXFuMnmmBVU",
                        language: "en"

                    };

                    var str1 = jQuery.param(params1);
                    var str2 = jQuery.param(params2);
                    var str3 = jQuery.param(params3);

                    var queryStr1 = "https://cors-anywhere.herokuapp.com/" + "https://maps.googleapis.com/maps/api/distancematrix/json?" + cleanup(str1);
                    var queryStr2 = "https://cors-anywhere.herokuapp.com/" + "https://maps.googleapis.com/maps/api/distancematrix/json?" + cleanup(str2);
                    var queryStr3 = "https://cors-anywhere.herokuapp.com/" + "https://maps.googleapis.com/maps/api/distancematrix/json?" + cleanup(str3);

                    var duration1;  //graber to store
                    var duration2;  //graber to own destination
                    var duration3;  //store to requester's location
                    var duration4;  //requester's location to graber's destination

                    //call API here
                    $.ajax({
                        url: queryStr1,
                        dataType: 'json',
                        success: function (resp1) {
                            console.log(resp1);
                            duration1 = resp1.rows[0].elements[0].duration.value;
                            duration2 = resp1.rows[0].elements[1].duration.value;

                            // console.log("duration1 is:!!!!!!!!!!" + duration1);
                            // console.log("duration2 is:!!!!!!!!!!" + duration2);
                            $.ajax({
                                url: queryStr2,
                                dataType: 'json',
                                success: function (resp2) {
                                    console.log(resp2);
                                    duration3 = resp2.rows[0].elements[0].duration.value;
                                    // console.log("duration3 is:!!!!!!!!!!" + duration3);

                                    $.ajax({
                                        url: queryStr3,
                                        dataType: 'json',
                                        success: function (resp3) {
                                            console.log(resp3);
                                            //can also work in this way instead of JSON.parse

                                            duration4 = resp3.rows[0].elements[0].duration.value;
                                            // console.log("duration4 is:!!!!!!!!!!" + duration4);
                                            var diffResult = duration1 + duration3 + duration4 - duration2;
                                            console.log("Difference is:!!!!!" + diffResult);
                                            if (diffResult > 2000) {
                                                console.log("don't recommend!!!");
                                                callback(num, false);


                                            } else {
                                                console.log("JUST DO IT MAN!!!");
                                                callback(num, true);

                                            }
                                        },
                                        error: function (req, status, err) {
                                            console.log('Something went wrong', status, err);
                                        }
                                    });
                                },
                                error: function (req, status, err) {
                                    console.log('Something went wrong', status, err);
                                }
                            });
                        },
                        error: function (req, status, err) {
                            console.log('Something went wrong', status, err);
                        }
                    });

                    console.log(queryStr1);
                    console.log(queryStr2);
                    console.log(queryStr3);

                }

                function cleanup(strQ) {

                    var str = strQ.replace(/%2C%20/g, ",");
                    var tempStr = str.replace(/%20/g, "+");
                    var ttempStr = tempStr.replace(/%2C/g, ",");
                    var tttempStr = ttempStr.replace(/%7C/g, "|");

                    return tttempStr;
                }

                function recommend(origin, destination) {

                    gOrders = new Array();

                    var senderStart = origin;
                    var senderDestination = destination;

                    console.log("senderStart++++++++++++" + senderStart);
                    console.log("senderDestination-------------" + senderDestination);

                    var url = "http://localhost:8000/";

                    try {
                        var httpRequest = new XMLHttpRequest();
                        httpRequest.onreadystatechange = httpStateChange;
                        httpRequest.onerror = httpError;
                        httpRequest.open("GET", url + "listallorders", true);
                        httpRequest.setRequestHeader("Content-type", "application/json");
                        httpRequest.send(null);
                    } catch (error) {
                        console.log(error);
                    }

                    function httpError() {
                        alert("network error");
                    }

                    function httpStateChange() {
                        if (httpRequest.readyState === 4) {
                            if (httpRequest.status === 200) {
                                var json = httpRequest.responseText;
                                serverResponse = JSON.parse(json);
                                for (var i = 0; i < serverResponse.length; i++) {
                                    var buyLocationNew = serverResponse[i].BuyLocation;
                                    var dropLocationNew = serverResponse[i].DropLocation;
                                    calculateTimeDiff(senderStart, senderDestination, buyLocationNew, dropLocationNew, i,
                                        function (number, result) {
                                            console.log("result is:!!!!!!" + result);
                                            if (result === true) {
                                                console.log("serverResponse is:!!" + number);
                                                gOrders.push(serverResponse[number]);
                                                console.log("gOrders now is :???????" + JSON.stringify(gOrders));
                                                app.orders = gOrders;
                                            }
                                        });
                                    console.log("now is looping No...." + i);
                                }
                            } else {
                                console.log("here");
                            }
                        }
                    }
                }

                recommend(originInput.value, destination.value);

            },

            grabOrder: function() {
                var url = "http://localhost:8000/";
                
                var currentUser = sessionStorageGet("Username", null);

                try {
                    var httpRequest = new XMLHttpRequest();
                    httpRequest.onreadystatechange = httpStateChange;
                    httpRequest.onerror = httpError;
                    httpRequest.open("POST", url + "orderstake", true);
                    httpRequest.setRequestHeader("Content-type", "application/json");
                    httpRequest.send(JSON.stringify({
                        sender: currentUser,
                        orderid: app.orderid,
                    }));
                } catch (error) {
                    alert("error");
                }

                function httpError() {
                    alert("network error");
                }

                function httpStateChange() {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200) {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            console.log(serverResponse);
                            app.retrieveOrders();
                            app.grabConfirm = false;
                        } else {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            app.addFormMsg = serverResponse.message;
                        }
                    }
                }
            },

            grabConfirmation: function(orderid) {
                app.grabConfirm = true;
                app.orderid = orderid;
            }

        }
    });
}

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

