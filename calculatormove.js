const calculator = document.querySelector("#calculator");
let isDragging = false;
let offsetX;
let offsetY;

const move = e =>{
    calculator.style.left = `${e.clientX - offsetX}px`;
    calculator.style.top = `${e.clientY - offsetY}px`;
}
calculator.addEventListener('mousedown', e =>{
    dragging = true;

    offsetX = e.clientX - calculator.offsetLeft;
    offsetY = e.clientY - calculator.offsetTop;

    document.addEventListener('mousemove', move)
})

document.addEventListener('mouseup', ()=>{
    document.removeEventListener('mousemove', move);
})