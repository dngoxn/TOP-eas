const canvas = document.getElementById('canvas');

function createNewCanvas(size) {
    const pixelSize = findPixelSize(size);
    console.log(pixelSize);
    for (let i = 0; i < size * size; i++) {
        const canvasPixel = document.createElement('div');
        canvasPixel.style.height = pixelSize;
        canvasPixel.style.width = pixelSize;
        canvasPixel.className = 'canvas-pixel';
        canvas.appendChild(canvasPixel);
    }
}

function findPixelSize(size) {
    const canvasSize = 500;
    return String(canvasSize / size) + 'px';
}

createNewCanvas(64);