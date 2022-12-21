const body = document.body;
const pageTitle = document.createElement('h1');
const btnContainer = document.createElement('div');
const newGridBtn = document.createElement('button');
const clearGridBtn = document.createElement('button');
const hideBorderBtn = document.createElement('button');
const flexContainer = document.createElement('div');
const footer = document.createElement('footer');

pageTitle.textContent = 'Etch a Sketch';
newGridBtn.textContent = 'New Grid';
clearGridBtn.textContent = 'Clear Grid';
hideBorderBtn.textContent = 'Hide Borders';
footer.textContent = 'by Shuri';
btnContainer.classList.add('btn-container');
flexContainer.classList.add('flex-container');


body.appendChild(pageTitle);
body.appendChild(btnContainer);
btnContainer.appendChild(newGridBtn);
btnContainer.appendChild(clearGridBtn);
btnContainer.appendChild(hideBorderBtn);
body.appendChild(flexContainer);
body.appendChild(footer);

function createNewGrid(gridSize) {
    for(let i = 0; i < gridSize; i++) {
        const flexChild = document.createElement('div');
        flexChild.classList.add('flex-child');
        flexContainer.appendChild(flexChild);
        for(let j = 0; j < gridSize; j++) {
            const flexItem = document.createElement('div');
            flexItem.classList.add('flex-item');
            flexChild.appendChild(flexItem);

            flexItem.addEventListener('mouseenter', () => {
                flexItem.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
                darkenOnHover(flexItem);
            })
        }
    }
}

function darkenOnHover(itemColor) {
    itemColor.addEventListener('mouseenter', () => {
        let itemDarkColor =  itemColor.style.backgroundColor;
        const firstIndex = itemDarkColor.indexOf('(');
        const lastIndex = itemDarkColor.indexOf(')');
        itemDarkColor = itemDarkColor.slice(firstIndex + 1, lastIndex).split(',');
        itemDarkColor = itemDarkColor.map(item => Math.floor(item / 1.7));
        itemColor.style.backgroundColor = `rgb(${itemDarkColor})`;
    })
}

function randomColor() {
    return Math.floor(Math.random() * 256);
}

function promptInputBox() {
    const promptFade = document.createElement('div');
    const promptBox = document.createElement('div');
    const promptMsg = document.createElement('p');
    const promptInput = document.createElement('input');
    const inputBtn = document.createElement('button');
    const promptCloseBtn = document.createElement('div');
    const promptCloseBox = document.createElement('div');

    inputBtn.textContent = 'Create';
    promptMsg.textContent = 'Enter a number between 1 and 100 to create a new grid';
    promptFade.classList.add('bg-fade');
    promptBox.classList.add('prompt-box');
    promptMsg.classList.add('prompt-msg');
    promptInput.classList.add('prompt-input');
    promptCloseBox.classList.add('prompt-close-box');
    promptCloseBtn.classList.add('prompt-close-btn');

    promptInput.setAttribute('type', 'number');
    promptInput.setAttribute('placeholder', '1 ~ 100');
    promptInput.setAttribute('min', '1');
    promptInput.setAttribute('max', '100');

    body.appendChild(promptFade);
    promptFade.appendChild(promptBox);
    promptBox.appendChild(promptCloseBox);
    promptCloseBox.appendChild(promptCloseBtn);
    promptBox.appendChild(promptMsg);
    promptBox.appendChild(promptInput);
    promptBox.appendChild(inputBtn);

    promptInput.focus();

    inputBtn.addEventListener('click', () => {
        const flexChildren = document.querySelectorAll('.flex-child');
        if (promptInput.value >= 1 && promptInput.value <= 100) {
            for(const flexChild of flexChildren) {
                if(flexChild) {
                    flexChild.remove();
                }
            }
            promptFade.remove();
            createNewGrid(promptInput.value)
            hideBorderBtn.textContent = 'Hide Borders'
        } else {
            promptMsg.textContent = 'Input not valid! Enter a numeric value between 1 and 100';
            promptMsg.classList.add('prompt-warning-msg');
            promptInput.value = '';
            promptInput.focus();
        } 
    });

    promptInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            inputBtn.click();
        }
    });

    promptCloseBtn.addEventListener('click', () => {
        promptFade.remove();
    });
}

function clearGrid() {
    const flexItems = document.querySelectorAll('.flex-item');
    for(const flexItem of flexItems) {
        flexItem.style.backgroundColor = 'transparent';
    }
}

function hideBorders() {
    const flexItems = document.querySelectorAll('.flex-item');
    for(const flexItem of flexItems) {
        if (flexItem.style.borderWidth !== '0px') {
            flexItem.style.borderWidth = '0px';
            hideBorderBtn.textContent = 'Show Borders';
        } else {
            flexItem.style.borderWidth = '1px';
            hideBorderBtn.textContent = 'Hide Borders';
        }
    }
}

window.addEventListener('load', createNewGrid(16));
newGridBtn.addEventListener('click', promptInputBox);
clearGridBtn.addEventListener('click', clearGrid);
hideBorderBtn.addEventListener('click', hideBorders);