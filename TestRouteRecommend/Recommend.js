/** 
 * Here is the api call and calculation for recommendation
 * 
 * How to use this? See button2_click() 
 * For instance, 
 * Graber's Starting point : Hilltop
 * Graber's destination: LWSN
 * Store Location: Ford Dinning court
 * Requester Location: 3rd
 * 
 * 
 * 
 * Qinmin Wang
 * 
*/


function body_onload() {
    testButton.onclick = button_click;
    testButton2.onclick = button2_click;
}


function checkRecommend(graberSta, graberDes, storeLoc, reqestLoc) {

    if (graberSta == null || graberDes == null || storeLoc == null || reqestLoc == null) {
        return false;
    }

    var timeDiff = 0; //time difference in secs

    timeDiff = calculateTimeDiff(graberSta, graberDes, storeLoc, reqestLoc);


    //if time difference larger than 10 mins, would't recommend
    if(timeDiff > 1200){
        console.log("don't recommend!!!")
        return false;

    }else{
        console.log("JUST DO IT MAN!!!")
        return true; 

    }


}
function calculateTimeDiff(graberSta, graberDes, storeLoc, reqestLoc){

    //create queryURL

    var params1 = {
        origins: graberSta,
        destinations: storeLoc + "|" + graberDes,
        mode: "walking",  
        key: "AIzaSyBb-Cf0pgRz4yUUFFbFaIecXXFuMnmmBVU"

    };
   
    var params2 = {
        origins: storeLoc,
        destinations: reqestLoc,
        mode: "walking",
        key: "AIzaSyBb-Cf0pgRz4yUUFFbFaIecXXFuMnmmBVU"

    }

    var params3 = {
        origins: reqestLoc,
        destinations: graberDes,
        mode: "walking",
        key: "AIzaSyBb-Cf0pgRz4yUUFFbFaIecXXFuMnmmBVU"

    }

    var str1 = jQuery.param(params1);
    var str2 = jQuery.param(params2);
    var str3 = jQuery.param(params3);

    var queryStr1= "https://cors-anywhere.herokuapp.com/"+"https://maps.googleapis.com/maps/api/distancematrix/json?" + cleanup(str1);
    var queryStr2= "https://cors-anywhere.herokuapp.com/"+"https://maps.googleapis.com/maps/api/distancematrix/json?" + cleanup(str2);
    var queryStr3= "https://cors-anywhere.herokuapp.com/"+"https://maps.googleapis.com/maps/api/distancematrix/json?" + cleanup(str3);

    // jQuery.get(queryStr1,function(json){
    //     //var res = JSON.parse(json);
    //     console.log("response is: !!!!!!!!!!" + json);
    //     //json.rows[0].elements[0].duration.value

    // });

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

            $.ajax({
                url: queryStr2,
                dataType: 'json',
                success: function (resp2) {
                    console.log(resp2);
                    duration3 = resp2.rows[0].elements[0].duration.value;
                    
                    $.ajax({
                        url: queryStr3,
                        dataType: 'json',
                        success: function (resp3) {
                            console.log(resp3);
                            //can also work in this way instead of JSON.parse

                            duration4 = resp3.rows[0].elements[0].duration.value;
                            
                
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

    return duration2 + duration3 + duration4 - duration1;




    


}

function cleanup(strQ){

    var str = strQ.replace(/%2C%20/g,",");
    var tempStr = str.replace(/%20/g,"+");
    var ttempStr = tempStr.replace(/%2C/g,",");
    var tttempStr = ttempStr.replace(/%7C/g,"|");

    return tttempStr;

}

function button2_click(){
    
    var Result = checkRecommend("Hilltop, West Lafayette", "LWSN, West Lafayette", "Ford Dinning Court, West Lafayette, IN 47906", "third Street, West Lafayette");

    console.log(Result);
}

function button_click() {

    //funtion1
    var params = {
        url: 'baidu.com',
        parameter1: 'value_1',
        parameter2: 'value 2',
        parameter3: 'value&3'
    };

    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');

    //funtion3

    var params2 = {folder:"subscriber Ray", file:"LWSN, WestLafayette"+"|"+"Electrical Engineering, WestLafayette, IN", alert:"yes", id:"12"};
    var strQ = jQuery.param(params2);
    var str = strQ.replace(/%2C%20/g,",");
    var tempStr = str.replace(/%20/g,"+");
    var ttempStr = tempStr.replace(/%2C/g,",");
    var tttempStr = ttempStr.replace(/%7C/g,"|");
    //var ttttempStr = tttempStr.replace("%20","");



    

    console.log("function1: " + query);

    console.log("function2: " + createURL(params));

    console.log("function3: " + tttempStr);






    // $.getRequestData = function () {
    //     var url = location.search; //获取url中"?"符后的字串
    //     var theRequest = {};
    //     if (url.indexOf("?") != -1) {
    //         var str = url.substr(1);
    //         strs = str.split("&");
    //         for (var i = 0; i < strs.length; i++) {
    //             theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    //         }
    //     }
    //     return theRequest;
    // };

    // 生成一个带参数的url




}

function createURL(obj) {
    var length = obj && obj.length,
        idx = 0,
        url = obj.url + '?';
    for (var key in obj) {
        if (key != 'url' && obj[key] !== null) {
            url += (key + '=' + encodeURIComponent(obj[key]) + '&');
        }
    }
    return url.substring(0, url.lastIndexOf('&'));
}