"use strict";

(function() {
    
    let books = [
        "MongoDB",
        "Express",
        "Angular",
        "Node",
    ];

    const list = document.getElementById(
        'books'
    );
    
    for ( let book of books ) {
        const li = document.createElement(
            'li'
        );
        li.appendChild(
            document.createTextNode(
                book
            )
        );
        list.appendChild(
            li
        );
    }
    
}());
