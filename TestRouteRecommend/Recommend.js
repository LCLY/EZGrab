function body_onload() {
    testButton.onclick = button_click;
    testButton2.onclick = button2_click;
}


function checkRecommend(graberSta, graberDes, storeLoc, reqestLoc) {

    if (graberSta != null || graberDes != null || storeLoc != null || reqestLoc != null) {
        return false;
    }

    var timeDiff = 0; //time difference in secs

    timeDiff = calculateTimeDiff(graberSta, graberDes, storeLoc, reqestLoc);


    //if time difference larger than 10 mins, would't recommend
    if(timeDiff > 600){
        return false;
    }else{

        return true; 

    }


}
function calculateTimeDiff(graberSta, graberDes, storeLoc, reqestLoc){

    //create queryURL

    var params1 = {
        origins: graberSta,
        destinations: storeLoc + "|" + graberDes,  
        key: "AIzaSyBb-Cf0pgRz4yUUFFbFaIecXXFuMnmmBVU"

    };
   
    var params2 = {
        origins: storeLoc,
        destinations: reqestLoc,
        key: "AIzaSyBb-Cf0pgRz4yUUFFbFaIecXXFuMnmmBVU"

    }

    var params3 = {
        origins: reqestLoc,
        destinations: graberDes,
        key: "AIzaSyBb-Cf0pgRz4yUUFFbFaIecXXFuMnmmBVU"

    }

    var str1 = jQuery.param(params1);
    var str2 = jQuery.param(params2);
    var str3 = jQuery.param(params3);

    var queryStr1= "https://maps.googleapis.com/maps/api/distancematrix/json?" + cleanup(str1);
    var queryStr2= "https://maps.googleapis.com/maps/api/distancematrix/json?" + cleanup(str2);
    var queryStr3= "https://maps.googleapis.com/maps/api/distancematrix/json?" + cleanup(str3);

    jQuery.get(queryStr1,function(json){
        alert("JSON DATA:" + json);
        //json.rows[0].elements[0].duration.value

    });

    console.log(queryStr1);
    console.log(queryStr2);
    console.log(queryStr3);
    


}

function cleanup(strQ){

    var str = strQ.replace(/%2C%20/g,",");
    var tempStr = str.replace(/%20/g,"+");
    var ttempStr = tempStr.replace(/%2C/g,",");
    var tttempStr = ttempStr.replace(/%7C/g,"|");

    return tttempStr;

}

function button2_click(){
    calculateTimeDiff("Hilltop, West Lafayette", "LWSN, West Lafayette", "Subway, Purdue", "third Street, West Lafayette");

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