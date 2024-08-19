const canvas = document.getElementById('canvas');
const resetBtn = document.getElementById('reset');
const slider = document.getElementById('slider');
const toggleLine = document.getElementById('toggle-line');
const toggleColor = document.getElementById('toggle-color');

const pixelStyleBorder = 'solid 0.1px black';
const basicColor = '000000';
let drawColor = getFormattedColor(basicColor);
let isDrawing = false;

canvas.addEventListener('mousedown', () => { isDrawing = true; });
canvas.addEventListener('mouseup', () => { isDrawing = false; });
// Optional stricter boundary for drawing
// canvas.addEventListener('mouseleave', () => { isDrawing = false; });
resetBtn.addEventListener('click', resetCanvas);
slider.oninput = () => { changeCanvasSize(slider.value); };
toggleLine.addEventListener('click', toggleShowLine);
toggleColor.addEventListener('click', toggleDrawColor)

function createNewCanvas(size) {
    // Create `size` x `size` children for canvas
    const pixelSize = findPixelSize(size);
    for (let i = 0; i < size * size; i++) {
        const canvasPixel = document.createElement('div');
        canvasPixel.style.height = pixelSize;
        canvasPixel.style.width = pixelSize;
        canvasPixel.className = 'canvas-pixel';
        canvasPixel.addEventListener('mousedown', draw);
        canvasPixel.addEventListener('mouseover', continuousDraw);
        canvas.appendChild(canvasPixel);
    }
    toggleShowLine();
}

function findPixelSize(size) {
    // Find correct size and return string element
    const canvasSize = 500;
    return String(canvasSize / size) + 'px';
}

function draw(e) {
    // Update pixel to show background color
    e.target.style.backgroundColor = drawColor;
}

function continuousDraw(e) {
    // Allow continuous drawing from previous `mousedown`
    if (isDrawing === true) {
        toggleDrawColor();
        e.target.style.backgroundColor = drawColor;
    }
}

function deleteCanvas() {
    // Remove all children from `canvas`
    while (canvas.firstChild)
        canvas.firstChild.remove();
}

function resetCanvas() {
    // Reset `canvas` to blank
    deleteCanvas()
    createNewCanvas(parseInt(slider.value));
}

function changeCanvasSize(size) {
    // Create new `canvas` with dimension `size`
    deleteCanvas();
    createNewCanvas(parseInt(size));
}

function toggleShowLine() {
    // Update border to `canvas`' children to follow `toggleLine`
    for (const child of canvas.childNodes) {
        if (toggleLine.checked) 
            child.style.border = pixelStyleBorder;
        else 
            child.style.border = '';
    }
}

function toggleDrawColor() {
    // Update `drawColor` to follow `toggleColor` option
    if (toggleColor.checked) {
        // credit for `randomColor` from
        // https://css-tricks.com/snippets/javascript/random-hex-color/
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        drawColor = getFormattedColor(randomColor);
    }
    else
        drawColor = getFormattedColor(basicColor);
}

function getFormattedColor(hexColor) {
    // Format `hexColor` to CSS string
    return '#' + hexColor;
}

createNewCanvas(slider.value);