/**
 * @author: Kyle Sherman
 * @date: 01/18/2026
 * @description
 * This is a foundational project for The Odin Project.
 * The purpose is to show advanced DOM manipulation by making
 * a virtual etch-a-sketch purely using JS and CSS
 * 
 * consists of a 16x16 grid of square divs that will use hover event listener
 * to make a trail following the user mouse movements
 * 
 * 
 * update: after making the 16x16 functional, I decided to go ahead and add a 100x100 pixel grid
 */

function generateBoard(){ 
    const boardContainer = document.querySelector("#game-board");
    // put in an array of board dims?
    const rows = 100;
    const cols = 100;

    // generate a 16 x 16 grid
    // primary issue is how we will identify each grid piece?
    // consider we can assign a class value of x-1 y-1 though x-16 y-16

    let currentX = 1;
    let currentY = 1;

    for(let y = currentY; y <= rows; y++) {
        for(let x = currentX; x <= cols; x++) {
            let pixel = document.createElement('div');
            pixel.classList.add("grid-item");
            // pixel.textContent = x + " " + y;

            pixel.addEventListener('mouseenter', () => {
                pixel.style.cssText = "background-color: black;";
            });

            boardContainer.appendChild(pixel);
        }
    }
}

generateBoard();