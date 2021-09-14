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

function piramydOfDoom(){
    setTimeout(function(){
        console.log('1');
        setTimeout(function(){
            console.log('2');
            setTimeout(function(){
                console.log('3');
            }, 500)
        }, 2000)
    },1000)
}
piramydOfDoom();

function asynchronusRequest(args, callback){
    if(!args) {
        return callback(new Error("No args"));
    } else {
        return setTimeout(() => callback(null, {body: `${args} ${Math.floor(Math.random() * 10)}`}), 500);
    }
}

function callbackHell(){
    asynchronousRequest('First', function first(error, response) {
        if(error){
            console.log(error);
            return;
        }
        console.log(response.body);
        asynchronousRequest('Second', function second(error, response) {
            if(error){
                console.log(error);
                return;
            }
            console.log(response.body);
            asynchronousRequest(null, function third(error, response) {
                if(error){
                    console.log(error);
                    return;
                }
                console.log(response.body);
            });
        });
    })
}

// initalize a promise
// Pending - Initial state before beign resolved of rejected
// Fullfilled - When the promise is resolver
// Rejected - When the promise is Rejected
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Resolving and asyncronous request'), 2000)
});

promise
    .then((firstResponse) => {
        return `${firstResponse} and chaining`
    })
    .then((secondResponse) => {
        console.log(secondResponse);
    })

function getUsers(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(onSuccess) {
                resolve([{
                    name: 'John',
                    age: 30
                }
                , {
                    name: 'Jane',
                    age: 25
                },
                {
                    name: 'Jack',
                    age: 20
                }]);
            } else {
                reject('Failed to fetch data!');
            }
        }, 2000)
    });
}

getUsers(true)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
    });


// Fetch a user from the Github API
// fetch('https://api.github.com/users/sotopro')
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.error(error);
//     })

// ES5: part 1

// var isMomHappy = true;

// // promise
// var willGetNewPhone = new Promise(function(resolve, reject){
//     if (isMomHappy){
//         var phone = {
//             brand: 'Samsung',
//             color: 'black',
//             since: 2020
//         }
//         resolve(phone); // fulfilled
//     } else {
//         var reason = new Error('mom is not happy');
//         reject(reason); //reject
//     }
// })

// var askMon = function(){
//     willGetNewPhone
//         .then(function(fullfilled){
//             console.log(fullfilled);
//         })
//         .catch(function(error){
//             console(error.message)
//         })
// }

// askMon();

//ES6
const isMomHappy = true;

const willIGetNewPhone = new Promise(
    (resolve, reject) => {
        if(isMomHappy) {
            const phone = {
                brand: 'Samsung Galaxy S10',
                color: 'black',
                since: 2020
            };
            resolve(phone);
        } else {
            const reason = new Error('mom is not happy');
            reject(reason);
        }
    }
);

// const showOff = (phone) => {
//     const message = `Hey friend, I have a new ${phone.color} ${phone.brand} phone`;
//     return Promise.resolve(message);
// }

async function showOff(phone) {
    return new Promise((resolve, reject) => {
        const message = `Hey friend, I have a new ${phone.color} ${phone.brand} phone`;
        resolve(message);
    });
}

async function askMom() {
    try{
        console.log('before asking Mom');
        let phone = await willIGetNewPhone;
        let message = await showOff(phone);
        console.log(message);
        console.log('after asking Mom');
    } catch(error) {
        console.log(error.message);
    }
}
(async () => {
    await askMom();
})();
// const askMom = () => {
//     willIGetNewPhone
//         .then(showOff)
//         .then(fullfilled => console.log(fullfilled))
//         .catch(error => console.log(error.message));
// }

// askMom();
