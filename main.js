const body = document.body;
const divContainer = document.createElement('div');
divContainer.classList.add('container');
body.appendChild(divContainer);

for(let i = 0; i < 16; i++) {
    const childContainer = document.createElement('div');
    childContainer.classList.add('child-contaier');
    divContainer.appendChild(childContainer);
    for(let j = 0; j < 16; j++) {
        const divChild = document.createElement('div');
        divChild.classList.add('div-child')
        childContainer.appendChild(divChild);
    }
}