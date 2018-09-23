'use strict';

namespace Generators {

    function* infiniteSequence() {

        let i: number = 0;
        let reset: boolean = false;

        while (true) {
            reset = yield i++;
            if ( reset ) {
                break;
            }
        }

        return 777;
    }

    let iterator = infiniteSequence();

    for (let i = 0; i < 3; i++) {

        console.log('inf', iterator.next().value);
    }

    console.log('reset', iterator.next(true).value);

    for (let i = 0; i < 3; i++) {

        console.log('inf', iterator.next().value);
    }
} 