const body = document.body;

const newGridBtn = document.createElement('button');
newGridBtn.classList.add('new-button');
newGridBtn.textContent = 'Generate';
body.appendChild(newGridBtn);

const container = document.createElement('div');
container.classList.add('container');
body.appendChild(container);

for(let i = 0; i < 16; i++) {
    const childContainer = document.createElement('div');
    childContainer.classList.add('child-container');
    container.appendChild(childContainer);
    for(let j = 0; j < 16; j++) {
        const child = document.createElement('div');
        child.classList.add('child')
        childContainer.appendChild(child);
    }
    newGridBtn.addEventListener('click', () => {
        childContainer.remove();
    })
}

newGridBtn.addEventListener('click', () => {
    const gridSize = prompt('Enter');
    for(let i = 0; i < gridSize; i++) {
        body.appendChild(container);
        const childContainer = document.createElement('div');
        childContainer.classList.add('child-container');
        container.appendChild(childContainer);
        for(let j = 0; j < gridSize; j++) {
            const child = document.createElement('div');
            child.classList.add('child')
            childContainer.appendChild(child);
        }
        newGridBtn.addEventListener('click', () => {
            childContainer.remove();
        })
    }
})