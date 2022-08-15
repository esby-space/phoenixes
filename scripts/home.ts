const main = () => {
    const container = document.querySelector("#gears") as HTMLElement;
    const canvas = createCanvas(container, 1600, 800);
    const context = canvas.getContext("2d");

    if (!context) throw "error creating context x_x";
    context.lineWidth = 30;

    let gears = [
        Gear({
            x: 1600,
            y: 770,
            teeth: 20,
            inner: 700,
            outer: 770,
            angle: 0,
            fill: "rgb(255, 213, 0)",
            speed: 1,
        }),

        Gear({
            x: 1600,
            y: 770,
            teeth: 20,
            inner: 630,
            outer: 700,
            angle: 0,
            fill: "#001022",
            speed: -1,
        }),

        Gear({
            x: 2610,
            y: 770,
            teeth: 10,
            inner: 230,
            outer: 300,
            angle: 9,
            stroke: "rgb(255, 213, 0)",
            speed: -1,
        }),

        Gear({
            x: 590,
            y: 770,
            teeth: 10,
            inner: 230,
            outer: 300,
            angle: 9,
            stroke: "rgb(255, 213, 0)",
            speed: -1,
        }),
    ];

    let last = 0;
    let dt = 0;
    const loop = (time: number) => {
        dt = (time - last) / 1000;
        last = time;

        context.clearRect(0, 0, 3200, 1600);
        gears.forEach((gear) => {
            gear.draw(context);
            gear.update(dt);
        });

        window.requestAnimationFrame(loop);
    };
    loop(0);
};

const Gear = (gear: {
    x: number;
    y: number;
    teeth: number;
    inner: number;
    outer: number;
    angle: number;
    speed: number;
    fill?: string;
    stroke?: string;
}) => {
    return {
        ...gear,
        draw(context: CanvasRenderingContext2D) {
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
            if (this.fill) {
                context.fillStyle = this.fill;
                context.fill();
                return;
            }

            if (this.stroke) context.strokeStyle = this.stroke;
            context.stroke();
        },

        update(dt: number) {
            this.angle += 200 * (this.speed / this.teeth) * dt;
        },
    };
};

const createCanvas = (
    container: HTMLElement,
    width?: number,
    height?: number
): HTMLCanvasElement => {
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

main();

// /\__/\
// (=o.o=)
// |/--\|
// (")-(")
