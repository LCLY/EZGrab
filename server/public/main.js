function body_onload() {
    var app = new Vue({
        el:"#app",

        data: {
            signIn:false,
            signInMsg:"",
            
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

                            app.signIn = true;
                        } else {
                            var json = httpRequest.responseText;
                            serverResponse = JSON.parse(json);
                            app.signInMsg = serverResponse.message;
                        }
                    }
                }
            },

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