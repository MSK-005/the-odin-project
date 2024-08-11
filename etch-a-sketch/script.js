function generateGrid() {
    for (let i = 0; i < gridSize; i++) {
        const rowContainer = document.createElement("div");
        for (let j = 0; j < gridSize; j++) {
            const columnContainer = document.createElement("div");
            columnContainer.classList.add("container");

            let containerSize = Math.floor(GRID_SIZE_IN_PIXELS / gridSize).toString() + "px"
            columnContainer.style.width = containerSize;
            columnContainer.style.height = containerSize;

            columnContainer.addEventListener("mouseover", function() {
                assignColours(columnContainer);
            });

            rowContainer.appendChild(columnContainer);
        }
        gridContainer.appendChild(rowContainer);
    }    
}

function deleteGrid() {
    const containers = document.querySelectorAll(".container");
    containers.forEach((container) => {
        container.remove();
    });
}

function assignColours(element) {
    if (!element.style.backgroundColor) {
        console.log("Option A running!");
        hexDigits = "0123456789ABCDEF";
        let randomColour = "#";
        for (let i = 0; i < 6; i++) {
            randomColour += hexDigits[Math.floor(Math.random() * 16)];
        }
        element.style.backgroundColor = randomColour;
        element.style.opacity = 0.1;
    } else {
        console.log(element.style.opacity);
        element.style.opacity += parseFloat(element.style.opacity) + 0.1;
        console.log("Option B running!");
    }
    
}

const GRID_SIZE_IN_PIXELS = 500;
const gridContainer = document.getElementById("grid-container");
let gridSize = 16;
generateGrid();
const gridSizeButton = document.getElementById("grid-size-button");

gridSizeButton.addEventListener("click", function() {
    do {
        gridSize = prompt("Number of squares per side (2 - 100):");
    }
    while (gridSize < 2 || gridSize > 100 || isNaN(gridSize));
    deleteGrid();
    generateGrid();
    
});