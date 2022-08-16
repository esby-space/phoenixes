"use strict";
const animateHome = () => {
    const container = document.querySelector("#gears");
    const canvas = createCanvas(container, 1600, 800);
    const context = canvas.getContext("2d");
    if (!context)
        throw "error creating context x_x";
    let gears = [
        // center yellow gear
        Gear({
            x: 1600,
            y: 800,
            teeth: 20,
            inner: 700,
            outer: 770,
            fill: "rgb(255, 213, 0)",
        }),
        // left yellow gear
        Gear({
            x: 590,
            y: 800,
            teeth: 10,
            inner: 230,
            outer: 290,
            angle: 9,
            fill: "rgb(255, 213, 0)",
            speed: -1,
        }),
        // right yellow gear
        Gear({
            x: 2610,
            y: 800,
            teeth: 10,
            inner: 230,
            outer: 290,
            angle: 9,
            fill: "rgb(255, 213, 0)",
            speed: -1,
        }),
    ];
    let last = 0;
    let dt = 0;
    const loop = (time) => {
        dt = (time - last) / 1000;
        last = time;
        context.clearRect(0, 0, 3200, 1600);
        gears.forEach((gear) => {
            gear.draw(context);
            gear.drawHole(context, 100, "#001022");
            gear.update(dt);
        });
        window.requestAnimationFrame(loop);
    };
    loop(0);
};
const Gear = (gear) => {
    return {
        speed: 1,
        angle: 0,
        ...gear,
        draw(context) {
            const step = (Math.PI * 2) / this.teeth;
            const quarter = step / 4;
            const start = (this.angle / 180) * Math.PI;
            context.beginPath();
            for (let i = 0; i < this.teeth; i++) {
                for (let j = 0; j < 4; j++) {
                    const radius = j < 2 ? this.outer : this.inner;
                    const dx = Math.cos(start + step * i + quarter * j) * radius + this.x;
                    const dy = Math.sin(start + step * i + quarter * j) * radius + this.y;
                    context.lineTo(dx, dy);
                }
            }
            context.closePath();
            context.fillStyle = this.fill;
            context.fill();
        },
        drawHole(context, width, color) {
            context.beginPath();
            context.arc(this.x, this.y, this.inner - width, 0, Math.PI * 2);
            context.closePath();
            context.fillStyle = color;
            context.fill();
        },
        update(dt) {
            this.angle += 200 * (this.speed / this.teeth) * dt;
        },
    };
};
const createCanvas = (container, width, height) => {
    const canvas = document.createElement("canvas");
    container.append(canvas);
    width = width ?? container.clientWidth;
    height = height ?? container.clientHeight;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    return canvas;
};
animateHome();
// /\__/\
// (=o.o=)
// |/--\|
// (")-(")
