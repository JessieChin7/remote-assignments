// requestSync.js
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
function requestSync(url) {
    // write code to request url synchronously
    const request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.send();
    if (request.status === 200) {
        console.log(request.responseText);
    }
}
requestSync(url) // would print out the execution time
requestSync(url)
requestSync(url)