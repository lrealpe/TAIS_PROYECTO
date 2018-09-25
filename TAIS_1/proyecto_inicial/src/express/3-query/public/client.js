"use strict";

// XMLHttpRequest.readyState:
// 0: request not initialized 
// 1: server connection established
// 2: request received 
// 3: processing request 
// 4: request finished and response is ready

// XMLHttpRequest.status:
// 200: OK 
// 404: File not found

(function() {
    
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let books = JSON.parse(xmlHttp.responseText);
            process(books);
        }
    };

    let async = true;
    xmlHttp.open("GET", "/books", async);
    xmlHttp.send();

    function process(books) {
        let list = document.getElementById("books");
        for (let book of books) {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(book));
            list.appendChild(li);
        }
    }
    
}());