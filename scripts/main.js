const canvas = document.getElementById('canvas');
const resetBtn = document.getElementById('reset');

let isDrawing = false;
let drawColor = 'black';

canvas.addEventListener('mousedown', () => { isDrawing = true; });
canvas.addEventListener('mouseup', () => { isDrawing = false; });
// Optional stricter boundary for drawing
// canvas.addEventListener('mouseleave', () => { isDrawing = false; });
resetBtn.addEventListener('click', resetCanvas);


function createNewCanvas(size) {
    const pixelSize = findPixelSize(size);
    for (let i = 0; i < size * size; i++) {
        const canvasPixel = document.createElement('div');
        canvasPixel.style.height = pixelSize;
        canvasPixel.style.width = pixelSize;
        canvasPixel.className = 'canvas-pixel';
        canvasPixel.addEventListener('mousedown', draw);
        canvasPixel.addEventListener('mouseover', continueDraw);
        canvas.appendChild(canvasPixel);
    }
}

function findPixelSize(size) {
    const canvasSize = 500;
    return String(canvasSize / size) + 'px';
}

function draw(e) {
    e.target.style.backgroundColor = drawColor;
}

function continueDraw(e) {
    if (isDrawing === true) {
        e.target.style.backgroundColor = drawColor;
    }
}

function resetCanvas() {
    while (canvas.firstChild) {
        canvas.firstChild.remove();
    }
    createNewCanvas(15);
}

createNewCanvas(12);