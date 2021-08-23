import Circle,{getNewCircle}  from "./Circle";
import GameBoard,{GameBoardParams} from "./GameBoard";
import Tile,{TileParams} from "./Tile";
import { Point, Velocity, Shape, colorArray, BoardPosition} from "interfaces";
import { forEachChild } from "typescript";

export interface SceneParams {
    tileSize: number,
    totCircles: number // TODO // QUITAR
}

const BOARD_PARAMS:GameBoardParams = {
    boardSize: { colum: 18, row: 20 },
    tileSize: 30
} 

class Scene {
    private tileSize : number;
    private sceneSize:any;
    private totalOfCircles;
    private circles: Circle[];
    private gameBoard: GameBoard;
    private sceneRules: Tile[];
    
    //private pacman: Pacaman;
    //private phanthoms: Phatom[];
    //private cookies: 
    // premios:

    // score 
    // lifes 

    constructor(sceneParams: SceneParams) {
        const { tileSize, totCircles} = sceneParams;

        this.totalOfCircles = totCircles || 30;
        this.tileSize = tileSize || 30;
        
        this.circles = [];
        this.sceneRules = [] ;
        this.gameBoard = new GameBoard(BOARD_PARAMS);
        //this.init();
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
        this.gameBoard.draw(context);
        this.circles.forEach((circle) => {
            circle.draw(context);
        })

        this.sceneRules.forEach((rule)=>{
            rule.drawLine(context);
        })
    }

    update(params: Object) {
        this.circles.forEach((circle) => {
            //circle.changeSize(params);
            circle.update(params);
        })
    }

    buildSceneRules(sceneSize:any ){
        const {width, height} = sceneSize;
        const columns = Math.round((width / this.tileSize));
        const rows = Math.round((height / this.tileSize));


        console.log({ width, height });
        console.log(this.tileSize);
        console.log({ ruletiles: columns*rows});
        
        const columIterable = Array.from(Array(columns).keys());
        const rowIterable = Array.from(Array(rows).keys());
        
        columIterable.forEach((colum)=>{
            rowIterable.forEach((row)=>{
                const rulePosition: BoardPosition = {colum,row}
                this.sceneRules.push(Tile.getNewTile(this.tileSize, rulePosition))
            })
        })

        this.setSceneSize(sceneSize);
    }

    //Getter Setter
    getCircles() {
        return this.circles;
    }

    setSceneSize (sceneSize:any){
        this.sceneSize = sceneSize;
    }




}

export default Scene;