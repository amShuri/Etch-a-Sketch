const body = document.body;

const pageTitle = document.createElement('h1');
const btnContainer = document.createElement('div');
const newGridBtn = document.createElement('button');
const hideBorderBtn = document.createElement('button');
const flexContainer = document.createElement('div');

pageTitle.textContent = 'Etch a Sketch';
newGridBtn.textContent = 'New Grid';
hideBorderBtn.textContent = 'Hide Borders';
btnContainer.classList.add('btn-container');
flexContainer.classList.add('flex-container');

body.appendChild(pageTitle);
body.appendChild(btnContainer);
btnContainer.appendChild(newGridBtn);
btnContainer.appendChild(hideBorderBtn);
body.appendChild(flexContainer);

hideBorderBtn.addEventListener('click', () => {
    const flexDivs = document.querySelectorAll('div');
    for(const flexDiv of flexDivs) {
        if (flexDiv.style.borderWidth !== '0px') {
            flexDiv.style.borderWidth = '0px';
            hideBorderBtn.textContent = 'Show Borders';
        } else {
            flexDiv.style.borderWidth = '1px';
            hideBorderBtn.textContent = 'Hide Borders';
        }
    } 
})

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
        const flexDivs = document.querySelectorAll('div');
        if (promptInput.value >= 1 && promptInput.value <= 100) {
            for(const flexDiv of flexDivs) {
                if(flexDiv.classList.contains('flex-child')) {
                    flexDiv.remove();
                }
            }
            promptBox.remove();
            promptFade.remove();
            createNewGrid(promptInput.value);
        } else {
            promptMsg.textContent = 'Input not valid! Enter a numeric value between 1 and 100';
            promptMsg.classList.add('prompt-warning-msg');
            promptInput.value = '';
            promptInput.focus();
        } 
    })

    promptInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            inputBtn.click();
        }
    })

    promptCloseBtn.addEventListener('click', () => {
        promptBox.remove();
        promptFade.remove();
    })
}

window.addEventListener('load', createNewGrid(16));
newGridBtn.addEventListener('click', promptInputBox);