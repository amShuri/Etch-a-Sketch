const body = document.body;

const promptBtn = document.createElement('button');
promptBtn.classList.add('prompt-btn');
promptBtn.textContent = 'Generate Button';
body.appendChild(promptBtn);

const flexContainer = document.createElement('div');
flexContainer.classList.add('flex-container');
body.appendChild(flexContainer);

for(let i = 0; i < 16; i++) {
    const flexChild = document.createElement('div');
    flexChild.classList.add('flex-child');
    flexContainer.appendChild(flexChild);
    flexContainer.style.border = '1px solid black';
    flexContainer.style.borderLeft = 'none';
    flexContainer.style.borderTop = 'none';
    for(let j = 0; j < 16; j++) {
        const flexItem = document.createElement('div');
        flexItem.classList.add('flex-item')
        flexChild.appendChild(flexItem);
        flexItem.addEventListener('mouseenter', () => {
            flexItem.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
            darkenOnHover(flexItem);
        })
    }
    promptBtn.addEventListener('click', () => {
        flexChild.remove();
    })
}

promptBtn.addEventListener('click', () => {
    flexContainer.remove();
    const promptFade = document.createElement('div');
    promptFade.classList.add('bg-fade')
    body.appendChild(promptFade);

    const promptBox = document.createElement('div');
    promptBox.classList.add('prompt-box');
    promptFade.appendChild(promptBox);

    const promptInput = document.createElement('input');
    promptBox.appendChild(promptInput);
    promptInput.focus();

    promptInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            promptBox.remove();
            promptFade.remove();
            body.appendChild(flexContainer);
            createNewGrid(promptInput.value);
        }
    })
})

function createNewGrid(gridSize) {
    if(gridSize < 1) {
        flexContainer.remove();
    }
    for(let i = 0; i < gridSize; i++) {
        const flexChild = document.createElement('div');
        flexChild.classList.add('flex-child');
        flexContainer.appendChild(flexChild);
        for(let j = 0; j < gridSize; j++) {
            const flexItem = document.createElement('div');
            flexItem.classList.add('flex-item')
            flexChild.appendChild(flexItem);
            flexItem.addEventListener('mouseenter', () => {
                flexItem.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
                darkenOnHover(flexItem);
            })
        }
        promptBtn.addEventListener('click', () => {
            flexChild.remove();
        })
    }
}

function darkenOnHover(itemColor) {
        itemColor.addEventListener('mouseenter', () => {
        let itemDarkColor = itemColor.style.backgroundColor;
        const firstIndex = itemDarkColor.indexOf('(');
        const lastIndex = itemDarkColor.indexOf(')');
        itemDarkColor = itemDarkColor.slice(firstIndex + 1, lastIndex).split(',');
        console.log(itemDarkColor);
        itemDarkColor = itemDarkColor.map(item => Math.floor(item / 1.7));
        itemColor.style.backgroundColor = `rgb(${itemDarkColor})`
        });
}

function randomColor() {
return Math.floor(Math.random() * 256);
}