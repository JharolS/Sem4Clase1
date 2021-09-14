function first(){
    console.log(1);
}

function second(callback){
    setTimeout(function(){
        console.log(2);
        callback();
    }, 0);
}

function third(){
    console.log(3);
}

first();
second(third);

// function fn(){
//     console.log('Just a function')
// }

// function highOrderFunction(callback){
//     callback();
// }

// highOrderFunction(fn);