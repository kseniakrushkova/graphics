function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
}

function draw() {
    background("#000");
    noFill();
    stroke('#57f7f6');
    strokeWeight(4);
    rotateX(millis() * 0.001);
    rotateY(millis() * 0.001);
    rotateZ(millis() * 0.001);
    box(300, 300, 300);
}