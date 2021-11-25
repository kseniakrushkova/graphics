const widthAndHeight = 1;

let canvas;
let cols;
let rows;
let ctx;
let filled;
let struct = new DynamicStructArray(7);
let nodeProg = 0;
let mouseDown = false;

const rand = max => Math.random() * max | 0;
const addNode = (x, y) => {
    if (x < 0 || x >= cols || y < 0 || y >= rows) return;
    const index = x + y * cols;
    const byte = index >>> 3;
    const bit = index & 7;
    if (filled[byte] >>> bit & 1) return;
    const a = struct.add();
    struct.data[a] = x >>> 8;
    struct.data[a + 1] = x & 255;
    struct.data[a + 2] = y >>> 8;
    struct.data[a + 3] = y & 255;
    filled[byte] |= 1 << bit;
};
const fillNode = a => {
    const x = struct.data[a] << 8 | struct.data[a + 1];
    const y = struct.data[a + 2] << 8 | struct.data[a + 3];
    ctx.fillStyle = "#57f7f6";
    // ctx.fillRect(x * widthAndHeight, y * widthAndHeight, widthAndHeight, widthAndHeight);
    ctx.fillRect(x , y , widthAndHeight, widthAndHeight);
    addNode(x, y - 1);
    addNode(x + 1, y);
    addNode(x, y + 1);
    addNode(x - 1, y);
    struct.remove(a);
};

const loop = () => {
    if (struct.length) {
        nodeProg += struct.length / (2 * Math.PI) * 2;
        for (; nodeProg > 1 && struct.length > 0; nodeProg--) {
            fillNode((Math.random() * struct.length | 0) * struct.unit);
        }
    }
    requestAnimationFrame(loop);
};

const addFromEvent = ({clientX, clientY}) => {
    // const x = clientX / widthAndHeight | 0;
    // const y = clientY / widthAndHeight | 0;
    const x = clientX | 0;
    const y = clientY | 0;
    addNode(x, y, rand(256), rand(256), rand(256));
};

const drawClick = () => {
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = "#57f7f6";
    ctx.fillText("Нажмите на экран!", canvas.width >>> 1, canvas.height >>> 1);
};

const init = () => {
    canvas = document.getElementById("canvas");
    // cols = Math.ceil((canvas.width = innerWidth) / widthAndHeight);
    // rows = Math.ceil((canvas.height = innerHeight) / widthAndHeight);
    cols = Math.ceil(canvas.width = innerWidth);
    rows = Math.ceil(canvas.height = innerHeight);
    ctx = canvas.getContext("2d");
    filled = new Uint8Array(Math.ceil(cols * rows / 8.0));
    canvas.addEventListener("mousedown", event => {
        addFromEvent(event);
        mouseDown = true;
    });
    window.addEventListener("mouseup", () => mouseDown = false);
    drawClick();
    requestAnimationFrame(loop);
};

document.addEventListener("DOMContentLoaded", init);
