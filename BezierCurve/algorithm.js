let pts = [];

var colors = ["f2cde1", "f2ebd5", "59ff96", "ffbffb", "40fff9", "a5ff40", "ffffff", "feff40", "f0e4ea",
    "57e4ea", "a0b7f7", "5ff757", "f2ced5", "f2f1ed", "ef0080", "57f7f6"];
var colorId = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    pts = [
        createVector(50, 50),
        createVector(100, 300),
        createVector(300, 300),
        createVector(350, 50)
    ];
}

function draw() {
    background('rgb(0,0,0)');
    noFill();
    stroke("#" + colors[colorId % colors.length]);
    strokeWeight(4);
    bezier(pts[0].x, pts[0].y,
        pts[1].x, pts[1].y,
        pts[2].x, pts[2].y,
        pts[3].x, pts[3].y);

    noStroke();
    fill(255);
    for (let pt of pts) {
        ellipse(pt.x, pt.y, 20, 20);
    }

    if (mouseIsPressed) {
        for (let pt of pts) {
            if (dist(mouseX, mouseY, pt.x, pt.y) < 20) {
                colorId++;
                pt.x = mouseX;
                pt.y = mouseY;
                break;
            }
        }
    }
}
