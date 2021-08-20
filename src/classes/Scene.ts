import Circle,{getNewCircle}  from "./Circle";
import { Point, Velocity, Shape, colorArray} from "interfaces";

class Scene {
    private totalOfCircles;
    private circles: Circle[];

    constructor(totCircles: number) {
        this.totalOfCircles = totCircles || 30;
        this.circles = [];
        this.init();
    }

    init() {
        this.circles = [];
        const iterable = Array.from(Array(this.totalOfCircles).keys());
        iterable.forEach((i) => {
            this.circles.push(getNewCircle())
        })
    }
    sceneLoop(context:any,params: Object){
        this.draw(context);
        this.update(params);

        this.circles.forEach((circle) => {
            circle.drawGuide(context,params);
        })
    }


    draw(context: any) {
        this.circles.forEach((circle) => {
            circle.draw(context);
        })
    }
    update(params: Object) {
        this.circles.forEach((circle) => {
            //circle.changeSize(params);
            circle.update(params);
        })
    }
    //Getter Setter
    getCircles() {
        return this.circles;
    }
}

export default Scene;