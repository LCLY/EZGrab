function body_onload() {
    Vue.component("order-entry", {
        template: "#order-entry-template",
        props: ["buylocation", "droplocation", "recipient", "notes", "id"],
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

            setHome : function() {
                app.buyRequestForm = false; 
                app.grabRequestForm = false;
                app.retrieveOrders();
            },

            setBuyRequests : function() {
                app.buyRequestForm = true; 
                app.grabRequestForm = false; 
                app.buyRequest();
            },

            setGrabRequests : function() {
                app.grabRequestForm = true; 
                app.buyRequestForm = false;
                app.grabRequest();
            }

            recommendMe: function() {
                app.orders = recommend(origin.value, destination.value);
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