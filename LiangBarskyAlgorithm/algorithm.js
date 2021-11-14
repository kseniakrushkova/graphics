var px;
var py;
var pw;
var ph;
var points = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    restart();
}

function draw() {
    background('rgb(0,0,0)');
    stroke('rgb(0,255,0)');
    var rect = new Rectangle(px, py, pw, ph);
    rect.Display();

    var phover = new Point(mouseX, mouseY);
    points.push(phover);
    for (let i = 0; i < points.length - 2; i += 2) {
        let s = new Segment(points[i], points[i + 1]);
        stroke('rgb(255,0,255)');

        s.Display();
        points[i].Display();
        points[i + 1].Display();
        rect.LiangBarsky(s);
    }
    stroke('rgb(0,255,0)');

    if (points.length % 2 === 0) {
        let s = new Segment(points[points.length - 2], points[points.length - 1]);
        s.Display();
        points[points.length - 2].Display();
    }

    points[points.length - 1].Display();
    points.pop();
}

function mousePressed() {
    if (mouseX < width && mouseY < height) {
        points.push(new Point(mouseX, mouseY));
    }
}

function restart() {
    px = 100;
    py = 100;
    pw = 400;
    ph = 400;
    points = [];
}

class Point {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }

    Display() {
        push();
        strokeWeight(3);
        point(this.X, this.Y);
        pop();
    }
}

class Segment {
    constructor(S, F) {
        this.Start = S;
        this.Finish = F;
    }

    Display() {
        push();
        strokeWeight(1);
        line(this.Start.X, this.Start.Y, this.Finish.X, this.Finish.Y);
        pop();
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        let p1 = new Point(x, y);
        let p2 = new Point(x, y + h);
        let p3 = new Point(x + w, y + h);
        let p4 = new Point(x + w, y);
        this.Segments = [new Segment(p1, p2),
            new Segment(p2, p3),
            new Segment(p3, p4),
            new Segment(p4, p1)];
    }

    Display() {
        for (let s of this.Segments) {
            s.Display();
        }
    }

    LiangBarsky(S) {
        let p = [S.Start.X - S.Finish.X,
            -S.Start.X + S.Finish.X,
            S.Start.Y - S.Finish.Y,
            -S.Start.Y + S.Finish.Y];
        let q = [S.Start.X - this.Segments[0].Start.X,
            this.Segments[2].Start.X - S.Start.X,
            S.Start.Y - this.Segments[0].Start.Y,
            this.Segments[2].Start.Y - S.Start.Y];
        let tmax = [0];
        let tmin = [1];
        for (let i = 0; i < 4; i++) {
            if (p[i] < 0) {
                tmax.push(q[i] / p[i]);
            } else {
                tmin.push(q[i] / p[i]);
            }
        }
        let t0 = max(tmax);
        let t1 = min(tmin);

        print(p);
        print(q);
        print(t0);
        print(t1);

        if (t0 <= t1) {
            let P0 = new Point(S.Start.X + p[1] * t0, S.Start.Y + p[3] * t0);
            let P1 = new Point(S.Start.X + p[1] * t1, S.Start.Y + p[3] * t1);
            let Sout0 = new Segment(S.Start, P0);
            let Sin = new Segment(P0, P1);
            let Sout1 = new Segment(P1, S.Finish);

            stroke('rgb(255,0,255)');
            Sout0.Display();
            Sout1.Display();

            stroke('rgb(0,255,255)');
            Sin.Display();
            P0.Display();
            P1.Display();

            print(P0);
            print(P1);
        }
    }
}
