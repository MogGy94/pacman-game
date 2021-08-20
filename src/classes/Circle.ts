import {Point,Velocity,Shape,colorArray} from "interfaces";


class Circle {
    private x: number;
    private y: number;
    private dx: number; //velocidad X
    private dy: number; //velocidad Y
    private radius: number;
    private maxRadius: number;
    private minRadius: number;
    private color: string;

    constructor(point: Point, velocity: Velocity, shape: Shape) {
        const { x, y } = point;
        const { dx, dy } = velocity;
        const { size = 10, color = "#FFF" } = shape;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = size;
        this.minRadius = size;
        this.color = color;
        //this.maxRadius = radius + Math.floor(Math.random() * 30);
        this.maxRadius = (size) * 5;
    }

    changeSize(params: any) {
        const { sqrt, pow } = Math;
        //  se agranda al estar cerca a un npunto
        const { point, pointRange } = params;
        const { x, y, radius, minRadius, maxRadius } = this;
        //Distancia por pitagoras
        const distance = sqrt(pow((point.x - x), 2) + pow((point.y - y), 2));

        //Limites Cuadrados
        /* if (point.x - this.x < D && point.x - this.x > -D &&
            point.y - this.y < D && point.y - this.y > -D) { */
        if (distance < pointRange) {
            if (radius < maxRadius)
                this.radius += 1;
        } else if (radius > minRadius) {
            this.radius -= 1;
        }
    }

    acelerate() {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }

    update(params: any) {
        this.changeSize(params)
        this.acelerate();
    }

    draw(context: any) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color
        context.fill();
    }

    drawGuide(context:any,params:any){
        const { x, y, radius, minRadius, maxRadius } = this;
        if(radius > minRadius){
            const LINE_COLOR = "#FF0000"
            const { point, pointRange } = params;

            context.strokeStyle = LINE_COLOR;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(point.x, point.y);
            context.stroke();
        }
        
    }

}
export const  getNewCircle = ():Circle=> {
    const point: Point = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
    }
    const velocity: Velocity = {
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
    }
    const shape: Shape = {
        size: (Math.random() * 15) + 4,
        color: colorArray[Math.floor(Math.random() * colorArray.length)]
    }

    return new Circle(point, velocity, shape);
}

export default Circle ;