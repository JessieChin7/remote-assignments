// requestAsync.js
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
function requestCallback(url) {
    // write code to request url asynchronously
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log(request.responseText);
        }
    };
    request.send();
}
function requestPromise(url) {
    // write code to request url asynchronously with Promise
    return new Promise((resolve, reject) => {
        // 定義 Http request
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = function () {
            if (request.status == 200) {
                // 使用 resolve 回傳成功的結果，也可以在此直接轉換成 JSON 格式
                resolve(request.responseText);
            } else {
                // 使用 reject 自訂失敗的結果
                reject(new Error(request))
            }
        };
        request.send();
    });
}
async function requestAsyncAwait(url) {
    // write code to request url asynchronously
    // you should call requestPromise here and get the result using async / await.
    var t = await requestPromise(url);
    console.log(t);
}
requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log);
requestAsyncAwait(url);
