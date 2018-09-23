"use strict";

(function() {
    
    let books = [
        "MongoDB",
        "Express",
        "Angular",
        "Node",
    ];

    let list = document.getElementById("books");
    for (let book of books) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(book));
        list.appendChild(li);
    }
    
}());
