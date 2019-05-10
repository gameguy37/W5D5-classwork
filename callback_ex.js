
class Clock {

    constructor() {

        const currentDate = new Date();
        this.hour = currentDate.getHours();
        this.minute = currentDate.getMinutes();
        this.second = currentDate.getSeconds();
        this.printTime();
        setInterval(this._tick.bind(this), 1000);
    }

    printTime() {
        let time = `${this.hour}:${this.minute}:${this.second}`;
        console.log(time);
    }

    _tick() {
        
        if (this.second === 60) {
            this.minute += 1;
            this.second = 0;
        } else {
            this.second += 1;
        }

        if (this.minute === 60 ) {
            this.hour += 1;
            this.minute = 0;
        }

        if (this.hour === 24) {
            this.hour = 0;
        }

        console.clear();
        this.printTime();
        
    }

}

// const clock = new Clock();

const rl = require('readline');
const reader = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
    if (numsLeft > 0) {
        reader.question('Give me a number: \n', (answer) => {
            let parsed = parseInt(answer);
            sum += parsed;
            numsLeft -= 1;
            console.log(`running total: ${sum}`);
            addNumbers(sum, numsLeft, completionCallback);
        });
    } else {
        completionCallback(sum);
        reader.close();
    }
}

// addNumbers(0, 3, sum => console.log(`total sum: ${sum}`));

function askIfGreaterThan(el1, el2, callback) {
    reader.question(`Is ${el1} greater than ${el2}? y/n \n`, (response) => {

        if (response === 'y') {
            callback(true);
        } else {
            callback(false);
        }

        // reader.close();
    }
    
    );

}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {

        if (i === arr.length - 1) {
            outerBubbleSortLoop(madeAnySwaps);
        } else {
            askIfGreaterThan(arr[i], arr[i + 1], (value) => {
                // madeAnySwaps = false;
                if (value === true) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    madeAnySwaps = true;
                }
                innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
            });
        }
}



// innerBubbleSortLoop([3,4,2], 0, false ,() => console.log("In outer Bubble Sort Loop") );


// askIfGreaterThan(3, 4, (value) => console.log(`Your response was ${value}`));

function absurdBubbleSort(arr, sortCompletionCallback) {
    
    outerBubbleSortLoop(true);

    function outerBubbleSortLoop(madeAnySwaps) {
        if (madeAnySwaps === true) {
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
        } else {
            sortCompletionCallback(arr);
        }
    }


}

// const cb = function sortCompletionCallback(arr) {
//     console.log("Sorted array: " + JSON.stringify(arr));
//     reader.close();
// }

// absurdBubbleSort([1,5,3,8,6,7], cb);

Function.prototype.myBind = function (context) {
    return () => {
        this.apply(context);
    };
};

// class Lamp {
//     constructor() {
//         this.name = "a lamp";
//     }
// }

// const turnOn = function () {
//     console.log("Turning on " + this.name);
// };

// const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"

Function.prototype.myThrottle = function(interval) {

    let tooSoon = false;

    return () => {
         if (tooSoon === true) {
             return ;
         } else {
             tooSoon = true;
             setTimeout( () => {
                tooSoon = false;
             } ,interval);

             this();
         }

    };

};

class Neuron {
    fire() {
        console.log("Firing!");
    }
};

const neuron = new Neuron;
// // When we create a new Neuron, 
// // we can call #fire as frequently as we want

// // // The following code will try to #fire the neuron every 10ms. Try it in the console:
// const interval = setInterval(() => {
//     neuron.fire();
// }, 10);

// // You can use clearInterval to stop the firing:
// clearInterval(interval);

// Using Function#myThrottle, we should be able to throttle 
// the #fire function of our neuron so that it can only fire 
// once every 500ms:

// neuron.fire = neuron.fire.myThrottle(500);

// const interval = setInterval(() => {
//     neuron.fire();
// }, 10);

// // This time, if our Function#myThrottle worked correctly, 
// // the Neuron#fire function should only be able to execute 
// // every 500ms, even though we're still trying to invoke it 
// // every 10ms!

// // If we want this behavior for ALL neurons, we can do the same logic in the constructor:

// class Neuron {
//     constructor() {
//         this.fire = this.fire.myThrottle(500);
//     }

//     fire() {
//         console.log("Firing!");
//     }
// };
