const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

var colors = ["f2cde1","f2ebd5","59ff96", "ffbffb", "40fff9", "a5ff40","ffffff", "feff40","f0e4ea",
    "57e4ea","a0b7f7","5ff757","f2ced5","f2f1ed","ef0080","57f7f6"];
var colorId = 0;

function drawLine(p0, p1) {
    colorId++;
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.strokeStyle = "#" + colors[colorId % colors.length];
    ctx.stroke();
}

function drawTriangle(p0, p1, p2) {
    drawLine(p0, p1);
    drawLine(p1, p2);
    drawLine(p2, p0);
}

function drawFractal(p0, p1, p2, limit) {
    if (limit > 0) {
        const pA = {
            x: p0.x + (p1.x - p0.x) / 2,
            y: p0.y - (p0.y - p1.y) / 2
        };
        const pB = {
            x: p1.x + (p2.x - p1.x) / 2,
            y: p1.y - (p1.y - p2.y) / 2
        };
        const pC = {
            x: p0.x + (p2.x - p0.x) / 2,
            y: p0.y
        };
        drawFractal(p0, pA, pC, limit - 1);
        drawFractal(pA, p1, pB, limit - 1);
        drawFractal(pC, pB, p2, limit - 1);
    } else {
        drawTriangle(p0, p1, p2);
    }
}

let i = 0;
setInterval(() => {
    ctx.clearRect(0, 0, c.width, c.height);
    drawFractal(
        { x: 0, y: c.height },
        { x: c.width / 2, y: 0 },
        { x: c.width, y: c.height },
        i
    );

    i = (i % 9) + 1;
}, 500);
