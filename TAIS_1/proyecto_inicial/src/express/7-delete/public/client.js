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
            let res = JSON.parse(xmlHttp.responseText);
            process(res.books);
        }
    };

    let async = true;
    xmlHttp.open("GET", "/books", async);
    xmlHttp.send();

    function process(books) {
        let list = document.getElementById("books");
        for (let book of books) {
            let a = document.createElement("a");
            a.href = "/delete/" + book.id;
            a.innerHTML = book.title

            let li = document.createElement("li");
            li.appendChild(a);
            list.appendChild(li);
        }
    }

}());

// --------------------------------------------------------
function sendForm(f) {
    let r = true;

    if ( f.category.value.length <= 0 ) {
        r = false;
        alert('Enter book Category');
    }
    else if ( f.title.value.length <= 0 ) {
        r = false;
        alert('Enter book Title');
    }
    
    return r;
}
