/* 
This is a js example of 
a block comment for 
week 2
*/
// this is an example of an inline comment

let num = 100; //integer

function foo(){
    let num2=200;
    console.log(num);
};

foo();

// let anonFUN = function() {
//     console.log('hello');
// };

// Figure out why this throws an error  let anonFun = () => console.log("hello");

    (function() {
        console.log('hi')
    })();

let person = "Summer";
    
function people(peopleName){
    console.log("Hello " + peopleName);
};

people(person);

let arr = ["foo", 123, ['zar', 'bar']];

console.log(arr[1]);

//set item in a array

arr[1] = 'barbar';

arr.push('car'); //adding a value to an array

arr.splice(2,1); //remove an item from the array(index, delete)

console.log(arr);

for (let item of arr){
    console.log(item);
} //looping thru array and printing (of will give name of item)

for (let i in arr){
    console.log(i + " " + arr[i]);
}//looping thru arr and grabbing index (in will give position)

arr.forEach((item, i) => console.log(i + " " + item));
//loop tgrough each item in teh array wiht its index



//objects

let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter",
};

console.log(obj1.name);
console.log(obj1["name"]); //either way works

//set value
obj1.job = "Barista";
console.log(obj1);
//set value wiht a sting   obj1.job = "Data Scientist"

for (let key in obj1){
    let value = obj1[key];
    console.log(`${key}: ${value}`);
};

console.log(`hello ${obj1["name"]} ${num}`);

//console.log("hello " + obj1 + " " + ) old way vs new way on line 80 & 83

//for (let i = 0; i < 10; i++)
    
//if else
//see why this doesn't work  let x = 75;
// let x = 75;

// if (x > 50) {
//     console.log("above avg");
// } else if (x >5) {
//     console.log("avg");
// }

//let y = (x>50) ? "Above Avg" : "Below Avg"; //other way to do if else

//travese DOM
//adding to that div in index ln 11
let example = document.getElementById('example');

example.innerHTML += "Hello world!"





