/**
 * @author: Kyle Sherman
 * @date: 01/18/2026
 */

// 1. add a <p> with red text that says "hey, I'm red"
const container = document.querySelector("#container");

const addP = document.createElement("p");
addP.textContent = "Hey, I'm red";
addP.style.cssText = 'color: red; backgound: white;';

container.appendChild(addP);

// 2. <h3> with blue text that says "Im a blue h3"
const addH3 = document.createElement("h3");
addH3.style.cssText = 'color: blue; background: white;';
addH3.textContent = "I'm a blue H3";

container.appendChild(addH3);

// 3. add a <div> with a black border and pink background
// add another <h1> that says "I'm in a div"
// add a <p> that says "ME TOO!"
// after creating the <div> with createElement, append the h1 and p to it 
// before adding it to the container

const newDiv = document.createElement("div");
const divH1 = document.createElement("h1");
divH1.textContent ="I'm in a div";
const divP = document.createElement("p");
divP.textContent = "ME TOO!";

newDiv.appendChild(divH1);
newDiv.appendChild(divP);

newDiv.style.cssText = 'border-style: solid; border-color: black; background-color: pink;';

container.appendChild(newDiv);
